import { z } from "zod";
// import { getAdSlots } from "@/lib/api/adSlots/queries";
import { adSlotSchema } from "../prisma/zod";

// Schema for adSlots - used to validate API requests
const baseSchema = adSlotSchema.omit({
  createdAt: true,
  updatedAt: true,
});

export const insertAdSlotSchema = baseSchema.omit({ id: true });
export const insertAdSlotParams = baseSchema
  .extend({
    sold: z.coerce.boolean(),
  })
  .omit({
    id: true,
  });

export const updateAdSlotSchema = baseSchema;
export const updateAdSlotParams = updateAdSlotSchema.extend({
  sold: z.coerce.boolean(),
});
export const adSlotIdSchema = baseSchema.pick({ id: true });

// Types for adSlots - used to type API request params and within Components
export type AdSlot = z.infer<typeof adSlotSchema>;
export type NewAdSlot = z.infer<typeof insertAdSlotSchema>;
export type NewAdSlotParams = z.infer<typeof insertAdSlotParams>;
export type UpdateAdSlotParams = z.infer<typeof updateAdSlotParams>;
export type AdSlotId = z.infer<typeof adSlotIdSchema>["id"];

// this type infers the return from getAdSlots() - meaning it will include any joins
