import { api } from "@repo/trpc";
import { notFound } from "next/navigation";
import React from "react";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardFooter,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TypographyH3,
} from "@repo/ui/components";
import { ListFilter, MoreHorizontal, PlusCircle } from "@repo/ui/icons";
import Image from "next/image";
import Link from "next/link";
import DeleteSlot from "./_deleteSlot";

export default async function InventoryLayout({
  params: { inventory },
}: {
  params: { inventory: string };
}) {
  const i = await api.inventory.getInventoryById.query({
    id: inventory,
  });
  if (!i) {
    return notFound();
  }
  const adSlots = i.adSlots;
  return (
    <>
      <div className="flex flex-1 min-h-[100vh] flex-col gap-4 lg:gap-6 lg:p-6">
        <TypographyH3 className="text-muted-foreground">
          Inventory : {i.inventoryName}
        </TypographyH3>
        <div className="flex items-center">
          <h2 className="scroll-m-20 font-bold tracking-tight xs:text-xl md:text-4xl lg:text-5xl">
            Your Ad Slots
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
            <Link href={`/inventories/${inventory}/new`}>
              <Button size="sm" className="h-8 gap-1">
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Add New Slot
                </span>
              </Button>
            </Link>
          </div>
        </div>
        {adSlots.length === 0 ? (
          <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
            <div className="flex flex-col items-center gap-1 text-center">
              <h3 className="text-2xl font-bold tracking-tight">
                You have no ad slots here.
              </h3>
              <p className="text-sm text-muted-foreground">
                Create an adSlots to list your ad spaces.
              </p>
              <Link href={`/inventories/${inventory}/new`}>
                <Button className="mt-4">Add New Slot</Button>
              </Link>
            </div>
          </div>
        ) : (
          <>
            <Card className="rounded-xl">
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="hidden w-[100px] sm:table-cell font-semibold">
                        Image
                      </TableHead>
                      <TableHead className="font-semibold">Name</TableHead>
                      <TableHead className="font-semibold">Status</TableHead>
                      <TableHead className="hidden md:table-cell font-semibold">
                        Price
                      </TableHead>
                      <TableHead className="hidden md:table-cell font-semibold">
                        Ad Space Type
                      </TableHead>
                      <TableHead className="hidden md:table-cell font-semibold">
                        Rented
                      </TableHead>
                      <TableHead className="font-semibold">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {adSlots.map((adSlot) => (
                      <TableRow>
                        <TableCell className="hidden sm:table-cell">
                          <img
                            alt="Product image"
                            className="aspect-square rounded-md object-cover"
                            height="64"
                            src={adSlot.slotImageUri!}
                            width="64"
                          />
                        </TableCell>
                        <TableCell className="font-medium">
                          {adSlot.slotName}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{adSlot.status}</Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {adSlot.slotPrice} sol
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {adSlot.slotType}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {!adSlot.lent ? "No Renter Yet" : adSlot.mintAddress}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                aria-haspopup="true"
                                size="icon"
                                variant="ghost"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Toggle menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <Link
                                href={`/inventories/${adSlot.inventoryId}/${adSlot.id}/edit`}
                              >
                                <DropdownMenuItem>Edit</DropdownMenuItem>
                              </Link>
                              <DeleteSlot id={adSlot.id} />
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </>
  );
}
