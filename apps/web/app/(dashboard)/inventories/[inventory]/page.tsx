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
  Tabs,
  TabsContent,
} from "@repo/ui/components";
import { ListFilter, MoreHorizontal, PlusCircle } from "@repo/ui/icons";
import Image from "next/image";

export default async function InventoryLayout({
  params: { inventory },
}: {
  params: { inventory: string };
}) {
  console.log(inventory);
  const adSlots = await api.adSlots.getAdSlots.query({
    id: inventory,
  });
  console.log(adSlots);
  if (!adSlots) {
    return notFound();
  }
  return (
    <>
      <div>Ad Inventory: {inventory}</div>
      <Tabs defaultValue="all">
        <div className="flex items-center">
          <h2 className="scroll-m-20 font-bold tracking-tight xs:text-xl md:text-4xl lg:text-5xl">
            Your Ad NFTs
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
                <DropdownMenuCheckboxItem>Archived</DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button size="sm" className="h-8 gap-1">
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Add Product
              </span>
            </Button>
          </div>
        </div>
        <TabsContent value="all">
          <Card>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="hidden w-[100px] sm:table-cell">
                      <span className="sr-only">Image</span>
                    </TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Price
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      Total Sales
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      Created at
                    </TableHead>
                    <TableHead>
                      <span className="sr-only">Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="hidden sm:table-cell">
                      <Image
                        alt="Product image"
                        className="aspect-square rounded-md object-cover"
                        height="64"
                        src="/placeholder.svg"
                        width="64"
                      />
                    </TableCell>
                    <TableCell className="font-medium">
                      Laser Lemonade Machine
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">Draft</Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      $499.99
                    </TableCell>
                    <TableCell className="hidden md:table-cell">25</TableCell>
                    <TableCell className="hidden md:table-cell">
                      2023-07-12 10:42 AM
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
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <div className="text-xs text-muted-foreground">
                Showing <strong>1-10</strong> of <strong>32</strong> products
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
      {adSlots.length === 0 && (
        <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
          <div className="flex flex-col items-center gap-1 text-center">
            <h3 className="text-2xl font-bold tracking-tight">
              You have no inventories
            </h3>
            <p className="text-sm text-muted-foreground">
              Create an adSlots to list your ad spaces.
            </p>
            <Button className="mt-4">Add adSlots</Button>
          </div>
        </div>
      )}
      {adSlots.map((adSlot) => {
        return <div>{adSlot.slotName}</div>;
      })}
    </>
  );
}
