export async function s3Upload(image: File) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL!}/api/upload`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        filename: image.name,
        contentType: image.type,
      }),
    }
  );
  if (!response.ok) {
    throw new Error("Failed to get pre-signed URL.");
  }
  const { url, fields } = await response.json();
  const formData = new FormData();
  Object.entries(fields).forEach(([key, value]) => {
    formData.append(key, value as string);
  });
  formData.append("file", image);

  const uploadResponse = await fetch(url, {
    method: "POST",
    body: formData,
  });
  if (!uploadResponse.ok) {
    console.error("S3 Upload Error:", uploadResponse);
    throw new Error("Upload failed.");
  }
  console.log("Image Uploaded Successfully.");
  const bucketName = process.env.NEXT_PUBLIC_AWS_BUCKET_NAME!;
  const region = process.env.NEXT_PUBLIC_AWS_REGION!;
  const objectKey = fields.key; // Assuming 'key' is the field name for the object key
  const objectUrl = `https://${bucketName}.s3.${region}.amazonaws.com/${objectKey}`;
  return objectUrl;
}
