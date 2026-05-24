import { getBookingsCollection } from "@/lib/bookings";
import { getAdminSession } from "@/lib/session";
import { istWallTimeToUtc } from "@/lib/slots";
import { bookingConfig } from "@/utils/siteData";

const TZ = bookingConfig.timezone;

export async function GET() {
  const ok = await getAdminSession();
  if (!ok) {
    return Response.json({ error: "unauthorized" }, { status: 401 });
  }

  const col = await getBookingsCollection();
  const now = new Date();
  const istToday = now.toLocaleDateString("en-CA", { timeZone: TZ });
  const startOfTodayIst = istWallTimeToUtc(istToday, 0, 0);

  const rows = await col
    .find({
      status: "paid",
      slotStart: { $gte: startOfTodayIst },
    })
    .sort({ slotStart: 1 })
    .limit(200)
    .project({
      bookingId: 1,
      patientName: 1,
      phone: 1,
      doctorValue: 1,
      slotStart: 1,
      slotEnd: 1,
    })
    .toArray();

  return Response.json({
    bookings: rows.map((r) => ({
      bookingId: r.bookingId,
      patientName: r.patientName,
      phone: r.phone,
      doctorValue: r.doctorValue,
      slotStart: r.slotStart.toISOString(),
      slotEnd: r.slotEnd.toISOString(),
    })),
  });
}
