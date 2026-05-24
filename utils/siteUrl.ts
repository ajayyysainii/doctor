const DEFAULT_SITE_URL = "https://www.orthodrskpalsania.com";

export function getSiteUrl(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_SITE_URL).replace(/\/$/, "");
}

export const BOOK_PATH = "/book";

export function bookUrl(): string {
  return `${getSiteUrl()}${BOOK_PATH}`;
}

export function consultationJoinUrl(bookingId: string): string {
  return `${getSiteUrl()}/consultation/${bookingId}`;
}
