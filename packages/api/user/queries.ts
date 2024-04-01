import { db, UserWalletAddress, userWalletSchema } from "@repo/db";

export const getUserByWallet = async (walletAddress: UserWalletAddress) => {
  const wallet = userWalletSchema.parse({
    walletAddress,
  });
  try {
    const user = await db.user.findFirst({
      where: { walletAddress: wallet.walletAddress },
    });
    return { user };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
