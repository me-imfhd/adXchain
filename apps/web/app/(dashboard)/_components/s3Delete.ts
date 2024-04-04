export async function deleteS3Image(imageURI: string) {
  const split = imageURI.split("/");
  const oldImageKey = split[split.length - 1];
  if (!oldImageKey) {
    throw new Error("Invalid Image URI");
  }
  const deleteResponse = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL!}/api/delete`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        key: oldImageKey,
      }),
    }
  );
  if (!deleteResponse.ok) {
    throw new Error("Failed to delete the old image.");
  }
  console.log("Image deleted Successfully");
}
