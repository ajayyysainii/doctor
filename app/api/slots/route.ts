import { type NextRequest } from "next/server";
import {
  expireStalePending,
  ensureBookingIndexes,
  getBookingsCollection,
} from "@/lib/bookings";
import { filterPastSlots, generateSlotsForDate } from "@/lib/slots";

export async function GET(request: NextRequest) {
  try {
    await ensureBookingIndexes();
    await expireStalePending();

    const date = request.nextUrl.searchParams.get("date");
    if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return Response.json({ error: "invalid_date" }, { status: 400 });
    }

    const slots = filterPastSlots(generateSlotsForDate(date));
    if (slots.length === 0) {
      return Response.json({ date, slots: [] });
    }

    const col = await getBookingsCollection();
    const starts = slots.map((s) => s.slotStart);
    const booked = await col
      .find({
        status: { $in: ["pending", "paid"] },
        slotStart: { $in: starts },
      })
      .project({ slotStart: 1 })
      .toArray();

    const bookedSet = new Set(booked.map((b) => b.slotStart.getTime()));

    return Response.json({
      date,
      slots: slots.map((s) => ({
        isoStart: s.isoStart,
        available: !bookedSet.has(s.slotStart.getTime()),
      })),
    });
  } catch (e) {
    console.error(e);
    return Response.json({ error: "server_error" }, { status: 500 });
  }
}
