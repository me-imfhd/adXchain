import { createTRPCRouter } from "../trpc";
import { adSlotsRouter } from "./adSlot";
import { inventoryRouter } from "./inventory";

export const appRouter = createTRPCRouter({
  inventory: inventoryRouter,
  adSlots: adSlotsRouter,
});

export type AppRouter = typeof appRouter;
