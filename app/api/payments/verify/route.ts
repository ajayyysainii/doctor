import crypto from "crypto";
import { type NextRequest } from "next/server";
import {
  ensureBookingIndexes,
  findBookingByOrderId,
  getBookingsCollection,
} from "@/lib/bookings";
import { notifyAdminBookingWhatsapp, sendBookingWhatsapp } from "@/lib/twilio";
import { sendAdminBookingEmail, sendBookingEmail } from "@/lib/email";
import { consultationJoinUrl } from "@/utils/siteUrl";

function timingSafeEq(a: string, b: string): boolean {
  const ba = Buffer.from(a, "utf8");
  const bb = Buffer.from(b, "utf8");
  if (ba.length !== bb.length) return false;
  return crypto.timingSafeEqual(ba, bb);
}

export async function POST(request: NextRequest) {
  try {
    await ensureBookingIndexes();

    const body = (await request.json()) as {
      razorpay_order_id?: string;
      razorpay_payment_id?: string;
      razorpay_signature?: string;
      bookingId?: string;
    };

    const orderId = body.razorpay_order_id;
    const paymentId = body.razorpay_payment_id;
    const signature = body.razorpay_signature;
    const bookingId = body.bookingId;

    if (!orderId || !paymentId || !signature || !bookingId) {
      return Response.json({ error: "missing_fields" }, { status: 400 });
    }

    const secret = process.env.RAZORPAY_KEY_SECRET;
    if (!secret) {
      return Response.json({ error: "server_misconfigured" }, { status: 500 });
    }

    const expected = crypto.createHmac("sha256", secret).update(`${orderId}|${paymentId}`).digest("hex");

    if (!timingSafeEq(expected, signature.toLowerCase())) {
      return Response.json({ error: "invalid_signature" }, { status: 400 });
    }

    const booking = await findBookingByOrderId(orderId);
    if (!booking || booking.bookingId !== bookingId) {
      return Response.json({ error: "booking_not_found" }, { status: 404 });
    }

    if (booking.status === "paid") {
      const joinUrl = consultationJoinUrl(booking.bookingId);
      return Response.json({
        ok: true,
        bookingId: booking.bookingId,
        joinUrl,
        slotStart: booking.slotStart.toISOString(),
        slotEnd: booking.slotEnd.toISOString(),
        idempotent: true,
      });
    }

    if (booking.status !== "pending") {
      return Response.json({ error: "invalid_booking_state" }, { status: 400 });
    }

    const channelName = booking.bookingId;
    const col = await getBookingsCollection();

    await col.updateOne(
      { bookingId },
      {
        $set: {
          status: "paid",
          paidAt: new Date(),
          "razorpay.paymentId": paymentId,
          "razorpay.signature": signature,
          "agora.channelName": channelName,
        },
      },
    );

    const joinUrl = consultationJoinUrl(booking.bookingId);

    // --- WhatsApp notifications (independent — failure won't block email) ---
    try {
      await sendBookingWhatsapp({
        to: booking.phone,
        slotStartIso: booking.slotStart.toISOString(),
        joinUrl,
        patientName: booking.patientName,
      });
      await notifyAdminBookingWhatsapp({
        slotStartIso: booking.slotStart.toISOString(),
        joinUrl,
        patientName: booking.patientName,
        patientPhone: booking.phone,
      });
    } catch (err) {
      console.error("[whatsapp] Notification failed:", err);
    }

    // --- Email notifications (independent — always runs even if WhatsApp failed) ---
    if (booking.email) {
      try {
        await sendBookingEmail({
          to: booking.email,
          patientName: booking.patientName,
          slotStartIso: booking.slotStart.toISOString(),
          joinUrl,
        });
        await sendAdminBookingEmail({
          patientName: booking.patientName,
          patientPhone: booking.phone,
          patientEmail: booking.email,
          slotStartIso: booking.slotStart.toISOString(),
          joinUrl,
        });
      } catch (err) {
        console.error("[email] Notification failed:", err);
      }
    }

    try {
      await col.updateOne({ bookingId }, { $set: { notifiedAt: new Date() } });
    } catch (err) {
      console.error("[db] Failed to set notifiedAt:", err);
    }


    return Response.json({
      ok: true,
      bookingId,
      joinUrl,
      slotStart: booking.slotStart.toISOString(),
      slotEnd: booking.slotEnd.toISOString(),
    });
  } catch (e) {
    console.error(e);
    return Response.json({ error: "server_error" }, { status: 500 });
  }
}
