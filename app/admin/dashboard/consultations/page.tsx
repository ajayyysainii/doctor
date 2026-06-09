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
    .find({ status: "paid", slotStart: { $gte: startOfTodayIst } })
    .sort({ slotStart: 1 })
    .limit(200)
    .project({ bookingId: 1, patientName: 1, phone: 1, slotStart: 1, slotEnd: 1 })
    .toArray();

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Upcoming Consultations</h1>
          <p className="mt-0.5 text-sm text-gray-500">Paid video consultations from today onward (IST).</p>
        </div>
        <span className="rounded border border-gray-200 bg-white px-3 py-1 text-sm font-medium text-gray-700">
          {rows.length} scheduled
        </span>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">When (IST)</th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Patient</th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Phone</th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {rows.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-12 text-center text-sm text-gray-400">
                  No upcoming paid consultations from today onward.
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
                  <tr key={r.bookingId} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-gray-700">{when}</td>
                    <td className="px-4 py-3 font-medium text-gray-900">{r.patientName}</td>
                    <td className="px-4 py-3 text-gray-500">{r.phone}</td>
                    <td className="px-4 py-3 text-right">
                      <Link
                        href={`/consultation/${r.bookingId}?role=admin`}
                        className="rounded bg-[#008de4] px-3 py-1.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
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
