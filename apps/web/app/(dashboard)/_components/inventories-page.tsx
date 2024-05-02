import InventoryCard from "@/components/layout/InventoryCard";
import { GetWalletsInventories } from "@repo/api";
import { NFTCollection } from "@repo/api/types";
import { Button, Card, CardContent, CardFooter } from "@repo/ui/components";
import { ExternalLink, PlusCircle } from "@repo/ui/icons";
import Link from "next/link";
import React from "react";

interface InventoriesPageProps {
  inventories: GetWalletsInventories;
}

const InventoriesPage = ({ inventories }: InventoriesPageProps) => {
  return (
    <div className="flex flex-1 min-h-[100vh] flex-col gap-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h2 className="scroll-m-20 font-bold tracking-tight xs:text-xl md:text-4xl lg:text-5xl">
          Your Ad Inventories
        </h2>
        <div className="ml-auto flex items-center gap-2">
          {/* future feature */}
          {/* <DropdownMenu>
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
          </DropdownMenu> */}
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
      {inventories.length === 0 ? (
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
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {inventories.map((inventory) => {
            const totalSpacesLent = inventory.adNFTs.filter(
              (adSlot) => adSlot.account.lent === true
            );
            const totalSpaces = inventory.adNFTs.length;
            const mintAddress = inventory.account.collectionMint.toBase58();
            const wa = mintAddress.slice(0, 4) + ".." + mintAddress.slice(-4);
            return (
              <Card className="rounded-xl">
                <div className="flex flex-col gap-1">
                  <div className="aspect-video overflow-hidden ">
                    <img
                      alt="Collection Image"
                      className="object-cover rounded-xl"
                      height="225"
                      src={inventory.image}
                      style={{
                        aspectRatio: "400/225",
                        objectFit: "cover",
                      }}
                      width="400"
                    />
                  </div>
                  <CardContent className="pt-3">
                    <div className="grid gap-3">
                      <div className="flex flex-row items-center justify-between">
                        <h3 className="font-semibold text-2xl">
                          {inventory.name}
                        </h3>
                      </div>
                      <div className="flex flex-col gap-1">
                        <p className="text-sm leading-none flex gap-2 justify-between">
                          <span className="text-muted-foreground font-medium ">
                            MINT
                          </span>
                          <Link
                            href={`https://explorer.solana.com/address/${mintAddress}?cluster=devnet`}
                          >
                            <span className="flex items-center hover:underline hover:-translate-y-[1px] gap-1 ">
                              <ExternalLink className="h-3 w-3" />
                              {wa}
                            </span>
                          </Link>
                        </p>
                        <p className="text-sm leading-none flex gap-2 justify-between">
                          <span className="text-muted-foreground font-medium ">
                            WEBSITE
                          </span>
                          <Link href={inventory.attributes.websiteUri}>
                            <span className="flex items-center hover:underline hover:-translate-y-[1px] gap-1 ">
                              <ExternalLink className="h-3 w-3" />
                              VISIT
                            </span>
                          </Link>
                        </p>
                        <p className="text-sm leading-none flex justify-between gap-2">
                          <span className="text-muted-foreground font-medium">
                            TOTAL AD SPACES
                          </span>
                          <span>{totalSpaces}</span>
                        </p>
                        <p className="text-sm leading-none flex justify-between gap-2">
                          <span className="text-muted-foreground font-medium">
                            AD SPACES LENT
                          </span>
                          <span>{totalSpacesLent.length}</span>
                        </p>
                        <p className="text-sm leading-none flex justify-between gap-2">
                          <span className="text-muted-foreground font-medium">
                            STATUS
                          </span>
                          <span>{inventory.attributes.listStatus.toUpperCase()}</span>
                        </p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex items-center gap-3">
                    <Link href={`/inventories/${Number(inventory.account.id)}`}>
                      <Button size="sm" className="h-8 gap-1">
                        VIEW INVENTORY
                      </Button>
                    </Link>
                    <Link href={`/inventories/${Number(inventory.account.id)}/edit`}>
                      <Button size="sm" className="h-8 gap-1" variant="outline">
                        EDIT
                      </Button>
                    </Link>
                  </CardFooter>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default InventoriesPage;
