import { Tooltip, TooltipTrigger, TooltipContent } from "@repo/ui/components";
import {
  Package2,
  Home,
  ShoppingCart,
  Package,
  Users2,
  LineChart,
  Settings,
} from "@repo/ui/icons";
import Link from "next/link";
import React from "react";

export default function Sidebar() {
  return (
    <>
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <Link
          href="/"
          className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
        >
          <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
          <span className="sr-only">adXchain</span>
        </Link>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="/inventories"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
            >
              <Package className="h-5 w-5" />
              <span className="sr-only">Inventories</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Inventories</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="/account"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
            >
              <Users2 className="h-5 w-5" />
              <span className="sr-only">Account</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Account</TooltipContent>
        </Tooltip>
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="#"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
            >
              <Settings className="h-5 w-5" />
              <span className="sr-only">Settings</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Settings</TooltipContent>
        </Tooltip>
      </nav>
    </>
  );
}
