import {
  createInventory,
  deleteInventory,
  getActiveInventoryById,
  getAllInventories,
  getInventories,
  getInventoryById,
  updateInventory,
} from "@repo/api";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import {
  insertInventoryParams,
  inventoryIdSchema,
  updateInventoryParams,
} from "@repo/db";

export const inventoryRouter = createTRPCRouter({
  getInventory: publicProcedure.query(async () => {
    return getInventories();
  }),
  getInventoryById: publicProcedure
    .input(inventoryIdSchema)
    .query(async ({ input }) => {
      return getInventoryById(input.id);
    }),
  getActiveInventoryById: publicProcedure
    .input(inventoryIdSchema)
    .query(async ({ input }) => {
      return getActiveInventoryById(input.id);
    }),
  getAllInventories: publicProcedure.query(async () => {
    return getAllInventories();
  }),
  createInventory: protectedProcedure
    .input(insertInventoryParams)
    .mutation(async ({ input }) => {
      return createInventory(input);
    }),
  updateInventory: protectedProcedure
    .input(updateInventoryParams)
    .mutation(async ({ input }) => {
      return updateInventory(input.id, input);
    }),
  deleteInventory: protectedProcedure
    .input(inventoryIdSchema)
    .mutation(async ({ input }) => {
      return deleteInventory(input.id);
    }),
});
