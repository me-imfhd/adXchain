import { getUserAuth } from "@repo/auth";
import { CreateProjectSchema, db } from "@repo/db";

export const getAllUserProject = async (userId: string) => {
  const project = await db.project.findMany({
    where: { userId },
    include: { inventory: true },
  });
  return { project };
};

export const getProjectById = async (id: string) => {
  const project = await db.project.findUnique({
    where: { id },
    include: { inventory: true },
  });
  return { project };
};

export const getUserProjectByInventoryId = async (inventoryId: string) => {
  const session = await getUserAuth();
  const project = await db.project.findFirst({
    where: { inventoryId, userId: session?.user.id },
    include: { inventory: true },
  });
  return project;
};

export type GetUserProjectByInventoryId = Awaited<
  ReturnType<typeof getUserProjectByInventoryId>
>;

export const createProject = async (data: CreateProjectSchema) => {
  const session = await getUserAuth();
  const project = await db.project.create({
    data: { ...data },
    include: { inventory: true },
  });
  return { project };
};
