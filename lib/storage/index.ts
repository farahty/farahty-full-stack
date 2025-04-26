"use server";
import * as Minio from "minio";

const storage = new Minio.Client({
  endPoint: process.env.STORAGE_END_POINT!,
  useSSL: true,
  accessKey: process.env.STORAGE_ACCESS_KEY!,
  secretKey: process.env.STORAGE_SECRET_KEY!,
});
const bucketName = process.env.STORAGE_BUCKET_NAME!;

export const createBucket = async () => {
  const exists = await storage.bucketExists(bucketName);
  if (!exists) {
    await storage.makeBucket(bucketName);
  }
};

export const removeBucket = async () => {
  const exists = await storage.bucketExists(bucketName);
  if (exists) {
    await storage.removeBucket(bucketName);
  }
};

export const uploadFile = async (file: File) => {
  const buffer = Buffer.from(await file.arrayBuffer());
  const fileName = `${Date.now()}-${file.name}`;
  const totalSize = buffer.length;

  // Upload the file to Minio
  await storage.putObject(bucketName, fileName, buffer, totalSize, {
    "Content-Type": file.type,
    "x-amz-meta-processed": "false",
  });

  return fileName;
};
