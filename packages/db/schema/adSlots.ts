import { z } from "zod";
// import { getAdSlots } from "@/lib/api/adSlots/queries";

// Schema for adSlots - used to validate API requests
const baseSchema = z.object({
  slotName: z.string(),
  slotDescription: z.string(),
  slotWebsiteUri: z.string(),
  slotPrice: z.number(),
  slotLength: z.number(),
  slotWidth: z.number(),
  slotType: z.enum(["aside", "banner", "popup", "other"]),
  status: z.enum(["active", "inactive"]),
  slotPlatform: z.enum(["web", "mobile", "billboard", "other"]),
});

export const insertAdSlotForm = baseSchema.omit({
  status: true,
});
export const updateAdSlotParams = baseSchema;
export const editAdSlotForm = baseSchema.omit({
  slotPrice: true,
});

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
export const inventoryAndAdSlotSchema = baseSchema.extend({
  inventoryName: z.string(),
  inventoryImageUri: z.string().nullish(),
  underdogApi: z.string(),
  files: z
    .any()
    .refine((files) => {
      return files;
    }, `Upload Image`)
    .refine((files) => {
      return files?.[0]?.size <= MAX_FILE_SIZE;
    }, `Max image size is 5MB.`)
    .refine(
      (files) => ACCEPTED_IMAGE_MIME_TYPES.includes(files?.[0]?.type),
      "Format not supported."
    ),
});
export const selectedSlotSchema = z.object({
  slotImageUri: z.string(),
  slotName: z.string(),
  id: z.string(),
  adFile: z.any(),
});
export type SelectedSlotSchema = z.infer<typeof selectedSlotSchema>;
export const multipleAdSlotForm = z.object({
  underdogApi: z.string(),
});

// Types for adSlots - used to type API request params and within Components
export type UpdateAdSlotParams = z.infer<typeof updateAdSlotParams>;
