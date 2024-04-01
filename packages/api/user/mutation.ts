import { getUserAuth } from "@repo/auth";
import {
  NewUserParams,
  UserId,
  UserWalletAddress,
  createUserSchema,
  db,
  userIdSchema,
  userWalletSchema,
} from "@repo/db";
import { randomUUID } from "crypto";
import { cookies } from "next/headers";

export const createUser = async (createUser: NewUserParams) => {
  const newUser = createUserSchema.parse({
    createUser,
  });
  try {
    const user = await db.user.create({ data: newUser });
    await createUserSession(user.id);
    return { user };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const createUserSession = async (userId: UserId) => {
  const uid = userIdSchema.parse({ id: userId });
  const sessionToken = randomUUID();
  const sessionExpiry = new Date(Date.now() + 60 * 60 * 24 * 30 * 1000);
  try {
    await db.session.create({
      data: {
        sessionToken,
        userId: uid.id,
        expires: sessionExpiry,
      },
    });
    cookies().set("next-auth.session-token", sessionToken, {
      expires: sessionExpiry,
    });
    const session = await getUserAuth();
    return { session };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
