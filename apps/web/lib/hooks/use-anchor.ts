import {
  useAnchorWallet,
  useConnection,
  useWallet,
} from "@solana/wallet-adapter-react";
import { useMemo } from "react";
import { IDL, anchor } from "@repo/contract";
import { PublicKey } from "@solana/web3.js";
const PROGRAM_KEY = new PublicKey(
  "FtX5sPSgTzSoefKZaeAqBuaYDUWKREUpiDNxFLsScEH2"
);
export const useAnchor = () => {
  const { connection } = useConnection();
  const anchorWallet = useAnchorWallet();
  const wallet = useWallet();
  const program = useMemo(() => {
    if (anchorWallet) {
      const provider = new anchor.AnchorProvider(
        connection,
        anchorWallet,
        anchor.AnchorProvider.defaultOptions()
      );
      anchor.setProvider(provider);
      return new anchor.Program(IDL, PROGRAM_KEY, provider);
    }
    return;
  }, [connection, anchorWallet]);

  return { connection, anchorWallet, wallet, program };
};

export default useAnchor;
