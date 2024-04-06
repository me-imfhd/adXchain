import {
  createProject,
  getAllUserProject,
  getProjectById,
  getUserProjectByInventoryId,
} from "@repo/api";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import {
  createProjectSchema,
  inventoryIdSchema,
  projectIdSchema,
  userIdSchema,
} from "@repo/db";

export const projectRouter = createTRPCRouter({
  getProjectById: publicProcedure
    .input(projectIdSchema)
    .query(async ({ input }) => {
      return getProjectById(input.id);
    }),
  getAllUserProject: publicProcedure
    .input(userIdSchema)
    .query(async ({ input }) => {
      return getAllUserProject(input.id);
    }),
  createProject: protectedProcedure
    .input(createProjectSchema)
    .mutation(async ({ input }) => {
      return createProject(input);
    }),
  getUserProjectByInventoryId: protectedProcedure
    .input(inventoryIdSchema)
    .mutation(async ({ input }) => {
      return getUserProjectByInventoryId(input.id);
    }),
});
