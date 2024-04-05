import {
  buySlot,
  createAdSlot,
  deleteAdSlot,
  getAdSlotById,
  getAdSlots,
  getSlotCountInInventory,
  updateAdSlot,
} from "@repo/api";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import {
  adSlotIdSchema,
  adSlotNameSchema,
  buySlotSchema,
  insertAdSlotParams,
  inventoryIdSchema,
  updateAdSlotParams,
} from "@repo/db";
import { getJSDocReturnType } from "typescript";

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
  createAdSlot: protectedProcedure
    .input(insertAdSlotParams)
    .mutation(async ({ input }) => {
      return createAdSlot(input);
    }),
  updateAdSlot: protectedProcedure
    .input(updateAdSlotParams)
    .mutation(async ({ input }) => {
      return updateAdSlot(input.id, input);
    }),
  deleteAdSlot: protectedProcedure
    .input(adSlotIdSchema)
    .mutation(async ({ input }) => {
      return deleteAdSlot(input.id);
    }),
  getSlotCountInInventory: publicProcedure
    .input(inventoryIdSchema)
    .query(async ({ input }) => {
      return getSlotCountInInventory(input.id);
    }),
  buySlot: publicProcedure.input(buySlotSchema).mutation(async ({ input }) => {
    return buySlot(input);
  }),
});
