import { api } from "@repo/trpc";
import {
  Button,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@repo/ui/components";
import { ListFilter, PlusCircle } from "@repo/ui/icons";
import Link from "next/link";
import React from "react";
export default async function InventoryPage() {
  const inventory = await api.inventory.getInventory.query();
  return (
    <div className="flex flex-1 min-h-[100vh] flex-col gap-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h2 className="scroll-m-20 font-bold tracking-tight xs:text-xl md:text-4xl lg:text-5xl">
          Your Ad Inventories
        </h2>
        <div className="ml-auto flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <ListFilter className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Filter
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem checked>
                Active
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Link href={"/inventories/new"}>
            <Button size="sm" className="h-8 gap-1">
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Add Inventory
              </span>
            </Button>
          </Link>
        </div>
      </div>
      {inventory.length === 0 && (
        <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
          <div className="flex flex-col items-center gap-1 text-center">
            <h3 className="text-2xl font-bold tracking-tight">
              You have no inventories
            </h3>
            <p className="text-sm text-muted-foreground">
              Create an inventory to list your ad spaces.
            </p>
            <Link href={"/inventories/new"}>
              <Button className="mt-4">Add Inventory</Button>
            </Link>
          </div>
        </div>
      )}
      {inventory.map((inventory) => {
        return <div>{inventory.inventoryName}</div>;
      })}
    </div>
  );
}
