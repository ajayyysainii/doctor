import Link from "next/link";
import { notFound } from "next/navigation";
import { getPaidBookingSummary } from "@/lib/bookings";
import { bookingConfig } from "@/utils/siteData";

export default async function BookSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ bookingId?: string }>;
}) {
  const { bookingId } = await searchParams;
  if (!bookingId) notFound();

  const summary = await getPaidBookingSummary(bookingId);
  if (!summary) notFound();

  const slotLabel = new Date(summary.slotStart).toLocaleString("en-IN", {
    timeZone: bookingConfig.timezone,
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const site = process.env.NEXT_PUBLIC_SITE_URL ?? "";
  const joinUrl = `${site.replace(/\/$/, "")}${summary.joinPath}`;

  return (
    <main className="min-h-screen bg-[#f0f6fa] py-16 px-4">
      <div className="mx-auto max-w-lg rounded-3xl bg-white p-8 shadow-lg">
        <h1 className="text-2xl font-black text-green-700">Booking confirmed</h1>
        <p className="mt-4 text-gray-700">
          Hi <strong>{summary.patientName}</strong>, your payment was successful.
        </p>
        <p className="mt-3 text-gray-600">
          <strong>When (IST):</strong> {slotLabel}
        </p>
        <p className="mt-2 text-sm text-gray-600">
          You will receive the same details and join link on WhatsApp shortly.
        </p>
        <div className="mt-8 flex flex-col gap-3">
          <a
            href={summary.joinPath}
            className="rounded-xl bg-[#008de4] py-4 text-center font-bold text-white shadow hover:bg-blue-600"
          >
            Open video room
          </a>
          <p className="break-all text-xs text-gray-500">{joinUrl}</p>
          <Link href="/" className="text-center text-sm font-medium text-[#008de4] hover:underline">
            Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
