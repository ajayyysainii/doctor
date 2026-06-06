import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import crypto from "crypto";

export type UploadFolder = "blog-images" | "blog-featured";

function getS3Client() {
  const region = process.env.AWS_REGION;
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

  if (!region || !accessKeyId || !secretAccessKey) {
    throw new Error(
      "Missing S3 credentials. Set AWS_REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY."
    );
  }

  return new S3Client({
    region,
    credentials: { accessKeyId, secretAccessKey },
  });
}

function getBucket(): string {
  const bucket = process.env.AWS_S3_BUCKET;
  if (!bucket) throw new Error("Missing AWS_S3_BUCKET env var.");
  return bucket;
}

/**
 * Uploads a Buffer/Uint8Array directly to S3 from the server.
 * Returns the public URL of the uploaded object.
 */
export async function uploadBufferToS3(
  buffer: Buffer,
  mimeType: string,
  folder: UploadFolder
): Promise<string> {
  const region = process.env.AWS_REGION!;
  const bucket = getBucket();
  const client = getS3Client();

  const ext = mimeType.split("/")[1]?.replace("jpeg", "jpg") ?? "bin";
  const key = `${folder}/${Date.now()}-${crypto.randomBytes(8).toString("hex")}.${ext}`;

  await client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: buffer,
      ContentType: mimeType,
    })
  );

  // Standard S3 public URL — requires the bucket to have a public-read bucket policy
  // or a CloudFront distribution in front. The ACL field is intentionally omitted
  // so this works with Block Public Access + bucket policy.
  return `https://${bucket}.s3.${region}.amazonaws.com/${key}`;
}
