import { z } from "zod";
import { projectSchema } from "../prisma/zod";

export const createProjectSchema = projectSchema.omit({
  createdAt: true,
  updatedAt: true,
  id: true,
});

export const projectIdSchema = projectSchema.pick({ id: true });

export type CreateProjectSchema = z.infer<typeof createProjectSchema>;
export type ProjectIdSchema = z.infer<typeof projectIdSchema>;
