import { type NextRequest } from "next/server";
import { MongoServerError } from "mongodb";
import {
  ensureBookingIndexes,
  expireStalePending,
  generateBookingId,
  getBookingsCollection,
  getConsultationFeePaise,
  normalizePhoneE164,
} from "@/lib/bookings";
import { getRazorpay } from "@/lib/razorpay";
import { generateSlotsForDate } from "@/lib/slots";
import { appointmentContent, bookingConfig } from "@/utils/siteData";

const TZ = bookingConfig.timezone;

function isValidDoctor(value: string): boolean {
  return appointmentContent.doctors.some((d) => d.value === value);
}

function slotBelongsToGeneratedDay(slotStart: Date): boolean {
  const istDateStr = slotStart.toLocaleDateString("en-CA", { timeZone: TZ });
  const valid = generateSlotsForDate(istDateStr).some(
    (s) => Math.abs(s.slotStart.getTime() - slotStart.getTime()) < 2000,
  );
  return valid;
}

export async function POST(request: NextRequest) {
  try {
    await ensureBookingIndexes();
    await expireStalePending();

    const body = (await request.json()) as {
      patientName?: string;
      phone?: string;
      email?: string;
      doctorValue?: string;
      slotStart?: string;
    };

    const patientName = (body.patientName ?? "").trim();
    const phoneRaw = (body.phone ?? "").trim();
    const email = (body.email ?? "").trim().toLowerCase();
    const doctorValue = body.doctorValue ?? "";
    const slotStartRaw = body.slotStart;

    if (!patientName || patientName.length > 120) {
      return Response.json({ error: "invalid_name" }, { status: 400 });
    }
    const phone = normalizePhoneE164(phoneRaw);
    if (!phone) {
      return Response.json({ error: "invalid_phone" }, { status: 400 });
    }
    // Basic email validation
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json({ error: "invalid_email" }, { status: 400 });
    }
    if (!isValidDoctor(doctorValue)) {
      return Response.json({ error: "invalid_doctor" }, { status: 400 });
    }
    if (!slotStartRaw || typeof slotStartRaw !== "string") {
      return Response.json({ error: "invalid_slot" }, { status: 400 });
    }

    const slotStart = new Date(slotStartRaw);
    if (Number.isNaN(slotStart.getTime())) {
      return Response.json({ error: "invalid_slot" }, { status: 400 });
    }

    if (!slotBelongsToGeneratedDay(slotStart)) {
      return Response.json({ error: "invalid_slot" }, { status: 400 });
    }

    const amountInPaise = getConsultationFeePaise();
    const slotEnd = new Date(slotStart.getTime() + bookingConfig.slotMinutes * 60_000);
    const bookingId = generateBookingId();
    const col = await getBookingsCollection();

    try {
      await col.insertOne({
        bookingId,
        patientName,
        phone,
        email,
        doctorValue,
        slotStart,
        slotEnd,
        status: "pending",
        amountInPaise,
        razorpay: {},
        agora: {},
        createdAt: new Date(),
      });
    } catch (e) {
      if (e instanceof MongoServerError && e.code === 11000) {
        return Response.json({ error: "slot_taken" }, { status: 409 });
      }
      throw e;
    }

    let orderId: string;
    try {
      const order = await getRazorpay().orders.create({
        amount: amountInPaise,
        currency: "INR",
        receipt: bookingId.slice(0, 32),
        notes: { bookingId },
      });
      orderId = order.id;
    } catch (e) {
      await col.deleteOne({ bookingId });
      console.error(e);
      return Response.json({ error: "payment_init_failed" }, { status: 502 });
    }

    await col.updateOne({ bookingId }, { $set: { "razorpay.orderId": orderId } });

    const key = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ?? process.env.RAZORPAY_KEY_ID;
    if (!key) {
      return Response.json({ error: "razorpay_key_missing" }, { status: 500 });
    }

    return Response.json({
      bookingId,
      orderId,
      amountInPaise,
      currency: "INR",
      key,
      patientName,
      phone,
      email,
    });
  } catch (e) {
    console.error(e);
    return Response.json({ error: "server_error" }, { status: 500 });
  }
}
