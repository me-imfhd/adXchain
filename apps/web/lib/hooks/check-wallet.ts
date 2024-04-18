import { Session, signOut } from "@repo/auth";
import { useEffect } from "react";
import { toast } from "sonner";
import { useAnchorContext } from "./use-anchor";

export function useWalletSession(session: Session) {
  const { anchorWallet, connection, program } = useAnchorContext();
  useEffect(() => {
    if (!anchorWallet?.publicKey) {
      return;
    }
    if (anchorWallet.publicKey.toBase58() !== session.user.walletAddress) {
      toast("New Wallet Found", {
        description: "Login With Your New Wallet",
      });
      (async () => {
        await signOut({ callbackUrl: "/signin", redirect: true });
      })();
    }
  }, [anchorWallet?.publicKey, session.user.walletAddress]);
  return { anchorWallet, connection, program };
}
