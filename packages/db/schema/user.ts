import { z } from "zod";
import { userSchema } from "../prisma/zod";

export const createUserSchema = userSchema.omit({
  emailVerified: true,
  id: true,
});
export const userWalletSchema = userSchema.pick({ walletAddress: true });
export const userIdSchema = userSchema.pick({ id: true });


export type NewUserParams = z.infer<typeof createUserSchema>;
export type UserWalletAddress = z.infer<typeof userSchema>["walletAddress"];
export type UserId = z.infer<typeof userSchema>["id"];
