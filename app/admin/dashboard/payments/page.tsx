import type { Filter } from "mongodb";
import { getBookingsCollection, type BookingDoc } from "@/lib/bookings";
import { bookingConfig } from "@/utils/siteData";
import Link from "next/link";

const TZ = bookingConfig.timezone;
const PAGE_SIZE = 10;

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
  if (status === "paid")
    return "inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold bg-green-50 text-green-700 border border-green-200";
  if (status === "pending")
    return "inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200";
  if (status === "cancelled")
    return "inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold bg-red-50 text-red-700 border border-red-200";
  return "inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold bg-gray-50 text-gray-600 border border-gray-200";
}

export default async function PaymentsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;
  const currentPage = Math.max(1, Number.parseInt(page ?? "1", 10) || 1);
  const col = await getBookingsCollection();
  const paymentQuery: Filter<BookingDoc> = {
    $or: [{ status: "paid" }, { "razorpay.orderId": { $exists: true } }],
  };

  const totalRecords = await col.countDocuments(paymentQuery);
  const totalPages = Math.max(1, Math.ceil(totalRecords / PAGE_SIZE));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const safeSkip = (safeCurrentPage - 1) * PAGE_SIZE;

  const rows = await col
    .find(paymentQuery)
    .sort({ paidAt: -1, createdAt: -1 })
    .skip(safeSkip)
    .limit(PAGE_SIZE)
    .project({
      bookingId: 1, patientName: 1, phone: 1, amountInPaise: 1,
      status: 1, razorpay: 1, createdAt: 1, paidAt: 1, slotStart: 1,
    })
    .toArray();

  const totalPaidPaise = rows
    .filter((r) => r.status === "paid")
    .reduce((sum, r) => sum + (r.amountInPaise ?? 0), 0);

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Payments</h1>
          <p className="mt-0.5 text-sm text-gray-500">Razorpay orders and payments tied to each booking. Most recent first.</p>
        </div>
      </div>

      {/* Stats */}
      <div className="mb-6 grid grid-cols-2 gap-4 sm:w-fit">
        <div className="rounded-lg border border-gray-200 bg-white px-5 py-4">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Revenue (this page)</p>
          <p className="mt-1 text-2xl font-bold text-gray-900">{inr(totalPaidPaise)}</p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white px-5 py-4">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Total records</p>
          <p className="mt-1 text-2xl font-bold text-gray-900">{totalRecords}</p>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-lg border border-gray-200 bg-white overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              {["When", "Patient", "Amount", "Status", "Order ID", "Payment ID", "Slot"].map((h) => (
                <th key={h} className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {rows.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-12 text-center text-sm text-gray-400">
                  No payment records yet.
                </td>
              </tr>
            ) : (
              rows.map((r) => (
                <tr key={r.bookingId} className="align-top hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-gray-600 text-xs whitespace-nowrap">{formatIst(r.paidAt ?? r.createdAt)}</td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-gray-900">{r.patientName}</p>
                    <p className="text-xs text-gray-400">{r.phone}</p>
                  </td>
                  <td className="px-4 py-3 font-semibold text-gray-900">{inr(r.amountInPaise)}</td>
                  <td className="px-4 py-3">
                    <span className={statusBadge(r.status ?? "")}>{r.status ?? "—"}</span>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-gray-500 max-w-[130px] truncate">
                    {r.razorpay?.orderId ?? "—"}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-gray-500 max-w-[130px] truncate">
                    {r.razorpay?.paymentId ?? "—"}
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-500 whitespace-nowrap">{formatIst(r.slotStart)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex items-center justify-between">
        <p className="text-sm text-gray-500">
          Page <span className="font-medium text-gray-700">{safeCurrentPage}</span> of{" "}
          <span className="font-medium text-gray-700">{totalPages}</span>
        </p>
        <div className="flex gap-2">
          {safeCurrentPage > 1 ? (
            <Link
              href={`/admin/dashboard/payments?page=${safeCurrentPage - 1}`}
              className="rounded border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Previous
            </Link>
          ) : (
            <span className="rounded border border-gray-100 bg-gray-50 px-3 py-1.5 text-sm font-medium text-gray-300 cursor-not-allowed">
              Previous
            </span>
          )}
          {safeCurrentPage < totalPages ? (
            <Link
              href={`/admin/dashboard/payments?page=${safeCurrentPage + 1}`}
              className="rounded border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Next
            </Link>
          ) : (
            <span className="rounded border border-gray-100 bg-gray-50 px-3 py-1.5 text-sm font-medium text-gray-300 cursor-not-allowed">
              Next
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
