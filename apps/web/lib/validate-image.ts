const MAX_FILE_SIZE = 1024 * 1024 * 5;
const ACCEPTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/gif",
  "video/webm",
  "video/mp4",
];
export function validateImage(image: File | null | undefined) {
  if (!image) {
    throw new Error("File Not Found");
  }
  if (!ACCEPTED_IMAGE_MIME_TYPES.includes(image.type)) {
    throw new Error("Format not supported");
  }
  if (!(image.size <= MAX_FILE_SIZE)) {
    throw new Error("Max image size is 5mb.");
  }
  return image;
}
