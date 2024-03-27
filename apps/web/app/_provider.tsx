"use client";

import { ThemeProvider } from "@repo/ui/components/ThemeProvider";
import { WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css";

import { useMemo, type PropsWithChildren } from "react";

const Provider = ({ children }: PropsWithChildren) => {
  const wallets = useMemo(() => [], []);
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <WalletProvider wallets={wallets} autoConnect>
        {/* <TrpcProvider> */}
        <WalletModalProvider>{children}</WalletModalProvider>
        {/* </TrpcProvider> */}
      </WalletProvider>
    </ThemeProvider>
  );
};

export default Provider;
