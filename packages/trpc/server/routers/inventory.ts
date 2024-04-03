import {
  createInventory,
  deleteInventory,
  getAllInventories,
  getInventories,
  getInventoryById,
  updateInventory,
} from "@repo/api";
import { createTRPCRouter, publicProcedure } from "../trpc";
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
  getAllInventories: publicProcedure
    .query(async ()=>{
      return getAllInventories();
    }),
  createInventory: publicProcedure
    .input(insertInventoryParams)
    .mutation(async ({ input }) => {
      return createInventory(input);
    }),
  updateInventory: publicProcedure
    .input(updateInventoryParams)
    .mutation(async ({ input }) => {
      return updateInventory(input.id, input);
    }),
  deleteInventory: publicProcedure
    .input(inventoryIdSchema)
    .mutation(async ({ input }) => {
      return deleteInventory(input.id);
    }),
});
