import { z } from "zod";

export const projectSchema = z.object({
  id: z.string(),
  inventoryId: z.string(),
  underdogProjectId: z.number().int(),
  collectionMintAddress: z.string(),
  userId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
export const createProjectSchema = projectSchema.omit({
  createdAt: true,
  updatedAt: true,
  id: true,
});

export const projectIdSchema = projectSchema.pick({ id: true });

export type CreateProjectSchema = z.infer<typeof createProjectSchema>;
export type ProjectIdSchema = z.infer<typeof projectIdSchema>;
