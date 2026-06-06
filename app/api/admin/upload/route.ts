import { getAdminSession } from "@/lib/session";
import { uploadBufferToS3, type UploadFolder } from "@/lib/s3";

const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/avif",
]);

const VALID_FOLDERS: UploadFolder[] = ["blog-images", "blog-featured"];

// 10 MB limit
const MAX_BYTES = 10 * 1024 * 1024;

export async function POST(request: Request) {
  const ok = await getAdminSession();
  if (!ok) return Response.json({ error: "unauthorized" }, { status: 401 });

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return Response.json({ error: "invalid_form_data" }, { status: 400 });
  }

  const file = formData.get("file");
  const folder = formData.get("folder");

  if (!(file instanceof File)) {
    return Response.json({ error: "missing_file" }, { status: 400 });
  }

  if (!folder || !VALID_FOLDERS.includes(folder as UploadFolder)) {
    return Response.json(
      { error: "invalid_folder", allowed: VALID_FOLDERS },
      { status: 400 }
    );
  }

  if (!ALLOWED_TYPES.has(file.type)) {
    return Response.json(
      { error: "unsupported_type", allowed: [...ALLOWED_TYPES] },
      { status: 400 }
    );
  }

  if (file.size > MAX_BYTES) {
    return Response.json(
      { error: "file_too_large", maxMb: MAX_BYTES / 1024 / 1024 },
      { status: 413 }
    );
  }

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const publicUrl = await uploadBufferToS3(buffer, file.type, folder as UploadFolder);
    return Response.json({ url: publicUrl });
  } catch (err) {
    const message = err instanceof Error ? err.message : "upload_failed";
    return Response.json({ error: message }, { status: 500 });
  }
}
