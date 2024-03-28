"use client";

import { ThemeProvider } from "@repo/ui/components/ThemeProvider";
import { WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css";

import { useMemo, type PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

const Provider = ({ children }: PropsWithChildren) => {
  const wallets = useMemo(() => [], []);
  const queryClient = new QueryClient();

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <WalletProvider wallets={wallets} autoConnect>
        {/* <TrpcProvider> */}
        <QueryClientProvider client={queryClient}>
          <WalletModalProvider>{children}</WalletModalProvider>
        </QueryClientProvider>
        {/* </TrpcProvider> */}
      </WalletProvider>
    </ThemeProvider>
  );
};

export default Provider;
