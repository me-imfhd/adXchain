"use client";

import { SessionProvider } from "@repo/auth";
import TrpcProvider from "@repo/trpc/trpc/Provider";

import { ThemeProvider } from "@repo/ui/components/ThemeProvider";
import { WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css";
import { cookies } from "next/headers";

import { useMemo, type PropsWithChildren } from "react";

const Provider = ({ children }: PropsWithChildren) => {
  const wallets = useMemo(() => [], []);

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <WalletProvider wallets={wallets} autoConnect>
        <TrpcProvider cookies={cookies().toString()}>
          <SessionProvider>
            <WalletModalProvider>{children}</WalletModalProvider>
          </SessionProvider>
        </TrpcProvider>
      </WalletProvider>
    </ThemeProvider>
  );
};

export default Provider;
