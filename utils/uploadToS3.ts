"use client";

export type UploadFolder = "blog-images" | "blog-featured";

/**
 * Uploads a file to S3 via the server-side multipart API route.
 * The file never touches the client's S3 credentials.
 * Returns the public S3 URL.
 */
export async function uploadToS3(file: File, folder: UploadFolder): Promise<string> {
  const body = new FormData();
  body.append("file", file);
  body.append("folder", folder);

  const res = await fetch("/api/admin/upload", {
    method: "POST",
    body, // multipart/form-data — browser sets the boundary automatically
  });

  const data = (await res.json()) as { url?: string; error?: string };

  if (!res.ok) {
    throw new Error(data.error ?? "Upload failed");
  }

  if (!data.url) throw new Error("No URL returned from upload");

  return data.url;
}
