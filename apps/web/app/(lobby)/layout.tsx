import type { PropsWithChildren } from "react";
import React from "react";
import { ProfileHeader } from "@/components/layout/profile-header";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Boxes } from "@/components/landing-page/Background";

export default function LobbyLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader>
        <ProfileHeader />
      </SiteHeader>
      <div className="min-h-screen relative w-full overflow-hidden bg-black flex flex-col rounded-lg">
      <Boxes />

      <main className="flex-1">{children}</main>
      </div>
      <SiteFooter></SiteFooter>
    </div>
  );
}
