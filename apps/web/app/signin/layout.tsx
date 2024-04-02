import type { PropsWithChildren } from "react";
import React from "react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { getUserAuth } from "@repo/auth";
import { redirect } from "next/navigation";

export default async function LobbyLayout({ children }: PropsWithChildren) {
  const session = await getUserAuth();
  if (session) {
    redirect("/trade");
  }
  return (
    <div className="relative flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">{children}</main>
    </div>
  );
}
