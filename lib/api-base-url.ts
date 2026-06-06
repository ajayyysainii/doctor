import { headers } from "next/headers";
import { getSiteUrl } from "@/utils/siteUrl";

export async function getInternalOrigin(): Promise<string> {
  try {
    const h = await headers();
    const host = h.get("x-forwarded-host") ?? h.get("host");
    const protocol = h.get("x-forwarded-proto") ?? "http";
    if (host) return `${protocol}://${host}`;
  } catch {
    // headers() is unavailable outside a request context
  }

  return getSiteUrl();
}
