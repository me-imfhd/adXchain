import React from "react";
import MobileSidebar from "./_components/mobile-sidebar";
import Sidebar from "./_components/sidebar";
import DynamicBreadcrumb from "./_components/breadcrumb";
import Profile from "./_components/profile";
import { checkAuth } from "@repo/auth";
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await checkAuth();
  return (
    <div className="flex  w-full flex-col bg-muted/40">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <Sidebar />
      </aside>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <MobileSidebar />
          <DynamicBreadcrumb />
          <div className="relative ml-auto flex-1 md:grow-0">
            <Profile session={session} />
          </div>
        </header>
        <main className="grid min-h-screen flex-1 items-start gap-4 px-4 pt-4 sm:px-6 sm:py-0 md:gap-8">
          {children}
        </main>
      </div>
    </div>
  );
}
