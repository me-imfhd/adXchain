"use client";

import TrpcProvider from "@repo/trpc/trpc/Provider";
import { ThemeProvider } from "@repo/ui/components/ThemeProvider";
import type { PropsWithChildren } from "react";

const Provider = ({ children }: PropsWithChildren) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <TrpcProvider>{children}</TrpcProvider>
    </ThemeProvider>
  );
};

export default Provider;
