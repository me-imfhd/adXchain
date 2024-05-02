import { z } from "zod";
export const userSchema = z.object({
  id: z.string().nullable(),
  name: z.string().nullable(),
  email: z.string().nullable(),
});
export const userWalletSchema = userSchema.pick({ id: true });
export const userIdSchema = userSchema.pick({ id: true });

export type NewUserParams = z.infer<typeof userSchema>;
export type UserWalletAddress = z.infer<typeof userSchema>["id"];
export type UserId = z.infer<typeof userSchema>["id"];
