import type { PropsWithChildren } from "react";
import React from "react";
import { SiteHeader } from "@/components/layout/SiteHeader";

export default function LobbyLayout({ children }: PropsWithChildren) {
  return (
    <div className="relative flex flex-col min-h-screen">
      <SiteHeader />

      <main className="flex-1  p-10">{children}</main>

      {/* <SiteFooter></SiteFooter> */}
    </div>
  );
}
