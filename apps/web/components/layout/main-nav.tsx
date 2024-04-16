"use client";

import * as React from "react";
import { NavigationMenuLink } from "@repo/ui/components";
import { cn } from "@repo/ui/cn";

export function MainNav() {
  return (
    <div className="gap-1 flex">
      <a aria-label="Home" href="/" className="items-center space-x-2 lg:flex">
        <h1 className="tracking-wide font-bold text-transparent bg-clip-text bg-gradient-to-r from-zinc-200/60 via-zinc-200 to-zinc-200/60 lg:inline-block text-3xl ">
          adXchain
        </h1>
      </a>
      <div>
        <span className="bg-[#561a04] text-white font-semibold w-10 p-1 px-2 rounded-lg h-5">
          BETA
        </span>
      </div>
    </div>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
