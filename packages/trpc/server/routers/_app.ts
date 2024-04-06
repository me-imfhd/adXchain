import { createTRPCRouter } from "../trpc";
import { adNftRouter } from "./adNft";
import { adSlotsRouter } from "./adSlot";
import { inventoryRouter } from "./inventory";
import { projectRouter } from "./project";

export const appRouter = createTRPCRouter({
  inventory: inventoryRouter,
  adSlots: adSlotsRouter,
  project: projectRouter,
  adNft: adNftRouter,
});

export type AppRouter = typeof appRouter;
