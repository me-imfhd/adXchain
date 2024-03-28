import {
  bundlrUploader,
  createUmi,
  mplCore,
  walletAdapterIdentity,
} from "@repo/api/lib/umi";
import { useWallet } from "@solana/wallet-adapter-react";

export const useUmi = () => {
  const wallet = useWallet();

  // Create Umi instance
  const umi = createUmi("https://api.devnet.solana.com/")
    .use(mplCore())
    .use(bundlrUploader())
    .use(walletAdapterIdentity(wallet));

  return umi;
};

export default useUmi;
