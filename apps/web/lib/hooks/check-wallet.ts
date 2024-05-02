import { Session, signOut } from "@repo/auth";
import { useEffect } from "react";
import { toast } from "sonner";
import { useAnchorContext } from "./use-anchor";
import { useWallet } from "@solana/wallet-adapter-react";

export function useWalletSession(session: Session) {
  const {
    anchorWallet,
    connection,
    program,
    sendTransaction,
    signMessage,
    publicKey,
  } = useAnchorContext();
  const { autoConnect } = useWallet();
  useEffect(() => {
    if (!anchorWallet?.publicKey) {
      return;
    }
    if (anchorWallet.publicKey.toBase58() !== session.user.id) {
      toast("New Wallet Found", {
        description: "Login With Your New Wallet",
      });
      (async () => {
        await signOut({ callbackUrl: "/signin", redirect: true });
      })();
    }
  }, [anchorWallet?.publicKey, session.user.id, autoConnect]);
  return {
    anchorWallet,
    connection,
    program,
    sendTransaction,
    signMessage,
    publicKey,
  };
}
