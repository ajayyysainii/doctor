"use client";

import dynamic from "next/dynamic";

// agora-rtc-react accesses `window` at module evaluation time.
// dynamic + ssr:false must be inside a Client Component — not a Server Component.
const ConsultationClient = dynamic(
  () =>
    import("./consultation-client").then((m) => ({ default: m.ConsultationClient })),
  { ssr: false },
);

export function ConsultationWrapper({
  bookingId,
  role,
}: {
  bookingId: string;
  role: "user" | "admin";
}) {
  return <ConsultationClient bookingId={bookingId} role={role} />;
}
