'use client'
import { usePathname } from 'next/navigation'
import {
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
  Breadcrumb,
} from "@repo/ui/components";
import Link from "next/link";
import React from "react";

export default function DynamicBreadcrumb() {
  const pathname = usePathname()
  return (
    <Breadcrumb className="hidden md:flex">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/dashboard" className={`${pathname === "/dashboard" ? 'font-semibold text-white' : ''}`}>Dashboard</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/inventories" className={`${pathname === "/inventories" ? 'font-semibold text-white' : ''}`}>Your Inventories</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/inventories/all" className={`${pathname === "/inventories/all" ? 'font-semibold text-white' : ''}`}>All Inventories</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
