import { z } from "zod";
import { adNftSchema } from "../prisma/zod";
import { adSlotIdSchema } from "./adSlots";

export const createAdNftSchema = adNftSchema
  .omit({
    createdAt: true,
    updatedAt: true,
    id: true,
  })
  .extend({ adSlotId: adSlotIdSchema });

export type CreateAdNftSchema = z.infer<typeof createAdNftSchema>;
