import { getBookingsCollection } from "@/lib/bookings";
import { bookingConfig } from "@/utils/siteData";

const TZ = bookingConfig.timezone;

function formatIst(d: Date | undefined | null) {
  if (!d) return "—";
  return new Date(d).toLocaleString("en-IN", {
    timeZone: TZ,
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function inr(paise: number | undefined) {
  if (!paise && paise !== 0) return "—";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(paise / 100);
}

function statusBadge(status: string) {
  const base = "inline-flex rounded-full px-2 py-0.5 text-xs font-semibold";
  if (status === "paid") return `${base} bg-green-100 text-green-700`;
  if (status === "pending") return `${base} bg-amber-100 text-amber-700`;
  if (status === "cancelled") return `${base} bg-red-100 text-red-700`;
  return `${base} bg-gray-100 text-gray-700`;
}

export default async function PaymentsPage() {
  const col = await getBookingsCollection();

  const rows = await col
    .find({
      $or: [
        { status: "paid" },
        { "razorpay.orderId": { $exists: true } },
      ],
    })
    .sort({ paidAt: -1, createdAt: -1 })
    .limit(200)
    .project({
      bookingId: 1,
      patientName: 1,
      phone: 1,
      amountInPaise: 1,
      status: 1,
      razorpay: 1,
      createdAt: 1,
      paidAt: 1,
      slotStart: 1,
    })
    .toArray();

  const totalPaidPaise = rows
    .filter((r) => r.status === "paid")
    .reduce((sum, r) => sum + (r.amountInPaise ?? 0), 0);

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Payments</h1>
          <p className="mt-1 text-sm text-gray-600">
            Razorpay orders and payments tied to each booking. Most recent first.
          </p>
        </div>
        <div className="flex gap-3">
          <div className="rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Paid total</p>
            <p className="text-xl font-bold text-gray-900">{inr(totalPaidPaise)}</p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Records</p>
            <p className="text-xl font-bold text-gray-900">{rows.length}</p>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-3">When</th>
              <th className="px-4 py-3">Patient</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Order ID</th>
              <th className="px-4 py-3">Payment ID</th>
              <th className="px-4 py-3">Slot</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-10 text-center text-gray-500">
                  No payment records yet.
                </td>
              </tr>
            ) : (
              rows.map((r) => {
                const when = r.paidAt ?? r.createdAt;
                return (
                  <tr key={r.bookingId} className="border-t border-gray-100 align-top">
                    <td className="px-4 py-3 text-gray-800">{formatIst(when)}</td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-gray-900">{r.patientName}</p>
                      <p className="text-xs text-gray-500">{r.phone}</p>
                    </td>
                    <td className="px-4 py-3 font-semibold text-gray-900">{inr(r.amountInPaise)}</td>
                    <td className="px-4 py-3">
                      <span className={statusBadge(r.status ?? "")}>{r.status ?? "—"}</span>
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-gray-600">
                      {r.razorpay?.orderId ?? "—"}
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-gray-600">
                      {r.razorpay?.paymentId ?? "—"}
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-600">{formatIst(r.slotStart)}</td>
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
