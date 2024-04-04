import "@/styles/globals.css";
import type { Metadata } from "next";
import { Toaster } from "@repo/ui/components";
import TailwindResposivenessIndicator from "@repo/ui/components/TailwindResposivenessIndicator";
import type { PropsWithChildren } from "react";
import Provider from "./_provider";
import { cn } from "@repo/ui/cn";
import { oxCustom, oxSemiBold, pressStart } from "@/lib/fonts";
import TrpcProvider from "@repo/trpc/trpc/Provider";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "AdXchain",
  description: "",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};
export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background antialiased font-ox",
          oxCustom.variable,
          oxSemiBold.variable,
          pressStart.variable,
        )}
      >
        <Provider>
          <TrpcProvider cookies={cookies().toString()}>
            {children}
            <TailwindResposivenessIndicator />
            <Toaster />
          </TrpcProvider>
        </Provider>
      </body>
    </html>
  );
}
