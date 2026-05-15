import Link from "next/link";
import { getBookingsCollection } from "@/lib/bookings";
import { istWallTimeToUtc } from "@/lib/slots";
import { bookingConfig } from "@/utils/siteData";

const TZ = bookingConfig.timezone;

export default async function ConsultationsPage() {
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
      slotStart: 1,
      slotEnd: 1,
    })
    .toArray();

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Upcoming consultations</h1>
          <p className="mt-1 text-sm text-gray-600">
            Paid video consultations scheduled from today onward (IST).
          </p>
        </div>
        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
          {rows.length} scheduled
        </span>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-3">When (IST)</th>
              <th className="px-4 py-3">Patient</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3"> </th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-10 text-center text-gray-500">
                  No upcoming paid bookings from today onward.
                </td>
              </tr>
            ) : (
              rows.map((r) => {
                const when = new Date(r.slotStart).toLocaleString("en-IN", {
                  timeZone: TZ,
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                });
                return (
                  <tr key={r.bookingId} className="border-t border-gray-100">
                    <td className="px-4 py-3 text-gray-800">{when}</td>
                    <td className="px-4 py-3 font-medium text-gray-900">{r.patientName}</td>
                    <td className="px-4 py-3 text-gray-600">{r.phone}</td>
                    <td className="px-4 py-3 text-right">
                      <Link
                        href={`/consultation/${r.bookingId}?role=admin`}
                        className="inline-block rounded-lg bg-blue-600 px-3 py-1.5 font-semibold text-white hover:bg-blue-500"
                      >
                        Join
                      </Link>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
