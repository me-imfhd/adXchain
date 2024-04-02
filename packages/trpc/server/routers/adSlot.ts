import {
  createAdSlot,
  deleteAdSlot,
  getAdSlotById,
  getAdSlots,
  updateAdSlot,
} from "@repo/api";
import { createTRPCRouter, publicProcedure } from "../trpc";
import {
  adSlotIdSchema,
  adSlotNameSchema,
  insertAdSlotParams,
  inventoryIdSchema,
  updateAdSlotParams,
} from "@repo/db";

export const adSlotsRouter = createTRPCRouter({
  getAdSlots: publicProcedure
    .input(inventoryIdSchema)
    .query(async ({ input: { id } }) => {
      return getAdSlots(id);
    }),
  getAdSlotById: publicProcedure
    .input(adSlotIdSchema)
    .query(async ({ input }) => {
      return getAdSlotById(input.id);
    }),
  createAdSlot: publicProcedure
    .input(insertAdSlotParams)
    .mutation(async ({ input }) => {
      return createAdSlot(input);
    }),
  updateAdSlot: publicProcedure
    .input(updateAdSlotParams)
    .mutation(async ({ input }) => {
      return updateAdSlot(input.id, input);
    }),
  deleteAdSlot: publicProcedure
    .input(adSlotIdSchema)
    .mutation(async ({ input }) => {
      return deleteAdSlot(input.id);
    }),
});
