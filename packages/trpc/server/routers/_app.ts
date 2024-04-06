import { createTRPCRouter } from "../trpc";
import { adNftRouter } from "./adNft";
import { adSlotsRouter } from "./adSlot";
import { inventoryRouter } from "./inventory";
import { projectRouter } from "./project";
import { publisherRouter } from "./publisher";

export const appRouter = createTRPCRouter({
  inventory: inventoryRouter,
  adSlots: adSlotsRouter,
  project: projectRouter,
  adNft: adNftRouter,
  publisher: publisherRouter,
});

export type AppRouter = typeof appRouter;
