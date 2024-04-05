import { z } from "zod";
// import { getAdSlots } from "@/lib/api/adSlots/queries";
import { adSlotSchema } from "../prisma/zod";

// Schema for adSlots - used to validate API requests
const baseSchema = adSlotSchema;

export const insertAdSlotSchema = baseSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export const insertAdSlotParams = baseSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const updateAdSlotParams = baseSchema.omit({ createdAt: true });
export const adSlotIdSchema = baseSchema.pick({ id: true });
export const adSlotNameSchema = baseSchema.pick({ slotName: true });

export const buySlotSchema = baseSchema.pick({
  id: true,
  mintAddress: true,
  ownerAddress: true,
  ownerEmail: true,
  lent: true,
});
export const buyMultipleSlotSchema = z.array(buySlotSchema);

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
export const multipleAdSlotForm = z
  .object({ slotArray: z.array(selectedSlotSchema) })
  .extend({
    inventoryName: z.string(),
    inventoryImageUri: z.string().nullish(),
    underdogApi: z.string(),
    ownerAddress: z.string(),
    ownerEmail: z.string(),
  });

// Types for adSlots - used to type API request params and within Components
export type AdSlot = z.infer<typeof adSlotSchema>;
export type NewAdSlot = z.infer<typeof insertAdSlotSchema>;
export type NewAdSlotParams = z.infer<typeof insertAdSlotParams>;
export type UpdateAdSlotParams = z.infer<typeof updateAdSlotParams>;
export type AdSlotId = z.infer<typeof adSlotIdSchema>["id"];
export type AdSlotName = z.infer<typeof adSlotNameSchema>["slotName"];
export type BuySlot = z.infer<typeof buySlotSchema>;
// this type infers the return from getAdSlots() - meaning it will include any joins
