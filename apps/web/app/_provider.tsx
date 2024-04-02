"use client";

import { SessionProvider } from "@repo/auth";
import { ThemeProvider } from "@repo/ui/components/ThemeProvider";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css";

import { useMemo, type PropsWithChildren } from "react";

const Provider = ({ children }: PropsWithChildren) => {
  const wallets = useMemo(() => [], []);

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <ConnectionProvider endpoint="https://api.devnet.solana.com">
        <WalletProvider wallets={wallets} autoConnect>
          <SessionProvider>
            <WalletModalProvider>{children}</WalletModalProvider>
          </SessionProvider>
        </WalletProvider>
      </ConnectionProvider>
    </ThemeProvider>
  );
};

export default Provider;
