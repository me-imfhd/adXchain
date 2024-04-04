import { DeleteObjectCommand, S3Client } from "@aws-sdk/client-s3";

export async function DELETE(request: Request) {
  const { key } = await request.json();
  try {
    const client = new S3Client({
      region: process.env.AWS_REGION!,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },
    });

    const command = new DeleteObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: key,
    });

    await client.send(command);
    return new Response("Object deleted successfully.", { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Failed to delete object.", { status: 500 });
  }
}
