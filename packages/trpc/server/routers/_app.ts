import { createTRPCRouter } from "../trpc";
import { adSlotsRouter } from "./adSlot";
import { inventoryRouter } from "./inventory";
import { projectRouter } from "./project";
import { publisherRouter } from "./publisher";

export const appRouter = createTRPCRouter({
  inventory: inventoryRouter,
  adSlots: adSlotsRouter,
  project: projectRouter,
  publisher: publisherRouter,
});

export type AppRouter = typeof appRouter;
