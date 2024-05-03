import "@/styles/globals.css";
import type { Metadata } from "next";
import TailwindResposivenessIndicator from "@repo/ui/components/TailwindResposivenessIndicator";
import type { PropsWithChildren } from "react";
import Provider from "./_provider";
import { cn } from "@repo/ui/cn";
import { oxCustom, oxSemiBold, pressStart } from "@/lib/fonts";
import TrpcProvider from "@repo/trpc/trpc/Provider";
import { cookies } from "next/headers";
import { Toaster } from "@repo/ui/components";
export const metadata: Metadata = {
  title: "AdXchain",
  description: "Introducing Ownership of Ad Spaces.",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};
export default function RootLayout({ children }: PropsWithChildren) {
  // const network = getNetworkCookie();
  const network = "devnet";
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background antialiased font-ox",
          oxCustom.variable,
          oxSemiBold.variable,
          pressStart.variable
        )}
      >
        <Provider network={network}>
          <TrpcProvider cookies={cookies().toString()}>
            {children}
            <TailwindResposivenessIndicator />
            <Toaster richColors closeButton />
          </TrpcProvider>
        </Provider>
      </body>
    </html>
  );
}
