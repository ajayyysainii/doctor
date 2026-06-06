export const BLOG_FALLBACK_IMAGE = "/image.png";

function isInvalidFeaturedImage(url: string) {
  if (!url) return true;
  if (url.endsWith(".svg")) return true;
  if (url.includes("icon-print")) return true;
  return false;
}

export function getBlogFeaturedImage(image?: string | null) {
  const trimmed = image?.trim() ?? "";
  if (isInvalidFeaturedImage(trimmed)) return BLOG_FALLBACK_IMAGE;
  return trimmed;
}
