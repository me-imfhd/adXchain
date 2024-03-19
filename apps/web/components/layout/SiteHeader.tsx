import React, { Suspense } from "react";
import { Skeleton, buttonVariants } from "@repo/ui/components";
import { cn } from "@repo/ui/cn";
import { MainNav } from "./main-nav";

export const SiteHeader = async ({ children }: React.PropsWithChildren) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-transparent backdrop-blur-[75px]">
      <div className="absolute left-0 top-0 -z-10 hidden h-full w-full transform-gpu bg-gradient-to-r from-red-500 via-red-600 to-green-500 opacity-70 blur-[58px] dark:block sm:opacity-35" />
      <div className="flex px-4 md:px-8 h-14 items-center justify-between">
        <MainNav></MainNav>
        <div className="flex items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <Suspense
              fallback={
                <Skeleton
                  className={cn(
                    buttonVariants({ size: "default" }),
                    "w-full bg-muted text-muted-foreground"
                  )}
                >
                  Loading...
                </Skeleton>
              }
            >
              {/* <ProfileHeader /> */}
              {children}
            </Suspense>
          </nav>
        </div>
      </div>
    </header>
  );
};
