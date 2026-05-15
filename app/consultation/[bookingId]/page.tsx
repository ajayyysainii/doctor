import { ConsultationWrapper } from "./consultation-wrapper";

export default async function ConsultationPage({
  params,
  searchParams,
}: {
  params: Promise<{ bookingId: string }>;
  searchParams: Promise<{ role?: string }>;
}) {
  const { bookingId } = await params;
  const { role } = await searchParams;
  const r = role === "admin" ? "admin" : "user";
  return <ConsultationWrapper bookingId={bookingId} role={r} />;
}
