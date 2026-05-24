import type { Collection, WithId } from "mongodb";
import crypto from "crypto";
import clientPromise from "@/utils/mongodb";
import { bookingConfig } from "@/utils/siteData";
import { consultationJoinUrl } from "@/utils/siteUrl";

export type BookingStatus = "pending" | "paid" | "cancelled" | "completed";

export type BookingDoc = {
  bookingId: string;
  patientName: string;
  phone: string;
  email: string;
  doctorValue: string;
  slotStart: Date;
  slotEnd: Date;
  status: BookingStatus;
  amountInPaise: number;
  razorpay: { orderId?: string; paymentId?: string; signature?: string };
  agora: { channelName?: string };
  createdAt: Date;
  paidAt?: Date;
  notifiedAt?: Date;
};

let indexPromise: Promise<void> | null = null;

export async function getBookingsCollection(): Promise<Collection<BookingDoc>> {
  const client = await clientPromise;
  return client.db().collection<BookingDoc>("bookings");
}

export async function ensureBookingIndexes(): Promise<void> {
  if (!indexPromise) {
    indexPromise = (async () => {
      const col = await getBookingsCollection();
      await col.createIndex(
        { slotStart: 1 },
        {
          unique: true,
          name: "uniq_slot_active",
          partialFilterExpression: { status: { $in: ["pending", "paid"] } },
        },
      );
      await col.createIndex({ bookingId: 1 }, { unique: true, name: "uniq_bookingId" });
      await col.createIndex({ "razorpay.orderId": 1 }, { sparse: true, name: "idx_razorpay_order" });
    })();
  }
  await indexPromise;
}

export function generateBookingId(): string {
  return crypto.randomBytes(10).toString("hex");
}

/** Remove stale unpaid reservations (frees slots for re-booking). */
export async function expireStalePending(): Promise<void> {
  const ms = bookingConfig.pendingReservationMinutes * 60_000;
  const col = await getBookingsCollection();
  await col.deleteMany({
    status: "pending",
    createdAt: { $lt: new Date(Date.now() - ms) },
  });
}

export function normalizePhoneE164(raw: string): string | null {
  const digits = raw.replace(/[\s()-]/g, "");
  if (!digits) return null;
  if (digits.startsWith("+")) {
    if (digits.length < 10) return null;
    return digits;
  }
  if (/^\d{10}$/.test(digits)) return `+91${digits}`;
  if (digits.startsWith("91") && digits.length === 12) return `+${digits}`;
  if (digits.startsWith("0") && digits.length === 11) return `+91${digits.slice(1)}`;
  return null;
}

export async function findBookingById(bookingId: string): Promise<WithId<BookingDoc> | null> {
  const col = await getBookingsCollection();
  return col.findOne({ bookingId });
}

export async function findBookingByOrderId(orderId: string): Promise<WithId<BookingDoc> | null> {
  const col = await getBookingsCollection();
  return col.findOne({ "razorpay.orderId": orderId });
}

export type PaidBookingSummary = {
  bookingId: string;
  patientName: string;
  slotStart: string;
  slotEnd: string;
  joinPath: string;
  joinUrl: string;
};

export async function getPaidBookingSummary(bookingId: string): Promise<PaidBookingSummary | null> {
  const b = await findBookingById(bookingId);
  if (!b || b.status !== "paid") return null;
  return {
    bookingId: b.bookingId,
    patientName: b.patientName,
    slotStart: b.slotStart.toISOString(),
    slotEnd: b.slotEnd.toISOString(),
    joinPath: `/consultation/${b.bookingId}`,
    joinUrl: consultationJoinUrl(b.bookingId),
  };
}

export function getConsultationFeePaise(): number {
  const rupees = parseInt(process.env.CONSULTATION_FEE_INR ?? "500", 10);
  if (!Number.isFinite(rupees) || rupees <= 0) return 50_000;
  return rupees * 100;
}
