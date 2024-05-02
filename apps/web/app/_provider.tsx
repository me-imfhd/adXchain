"use client";

import { SessionProvider } from "@repo/auth";
import { ThemeProvider } from "@repo/ui/components/ThemeProvider";
import { UseAnchorProvider } from "@/lib/hooks/use-anchor";
import { WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css";
import { ReactNode } from "react";
import { Network } from "@/lib/utils";

const Provider = ({
  children,
  network,
}: {
  children: ReactNode;
  network: Network;
}) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <WalletProvider wallets={[]} autoConnect>
        <SessionProvider>
          <WalletModalProvider>
            <UseAnchorProvider network={network}>{children}</UseAnchorProvider>
          </WalletModalProvider>
        </SessionProvider>
      </WalletProvider>
    </ThemeProvider>
  );
};

export default Provider;
