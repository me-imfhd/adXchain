import { getAllActiveInventories } from "@repo/api";
import {
  Button,
  Card,
  CardContent,
  CardFooter,
  Input,
  Shell,
} from "@repo/ui/components";
import { ExternalLink, SearchIcon } from "@repo/ui/icons";
import Link from "next/link";
import React from "react";

export default async function Page() {
  const inventories = await getAllActiveInventories();
  return (
    <div className="grid gap-6 lg:gap-8 mt-16">
      <Shell>
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-semibold">Discover Ad Inventories</h1>
          <div className="">
            Explore a diverse range of unique ad inventories listed across
            widest range of network apps from around the world best to reach
            your advertisiment goals.
          </div>
        </div>
        <div className="grid gap-4">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-3 h-4 w-4 " />
            <Input
              className="pl-8"
              placeholder="Search Inventories..."
              type="search"
            />
          </div>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {inventories.map((inventory) => {
            const totalSpacesLeft = inventory.adNFTs.filter(
              (adSlot) =>
                adSlot.account.lent === false &&
                adSlot.attributes.status === "active"
            );
            const totalSpaces = inventory.adNFTs.filter(
              (ad) => ad.attributes.status === "active"
            ).length;
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
                        <p className="text-sm leading-none flex justify-between gap-2">
                          <span className="text-muted-foreground font-medium">
                            TOTAL AD SPACES
                          </span>
                          <span>{totalSpaces ?? 0}</span>
                        </p>
                        <p className="text-sm leading-none flex justify-between gap-2">
                          <span className="text-muted-foreground font-medium">
                            AVAILABLE SPACES
                          </span>
                          <span>{totalSpacesLeft?.length || 0}</span>
                        </p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex items-center justify-between">
                    <Link
                      className="flex items-center gap-2 hover:underline  hover:-translate-y-[1px]"
                      href={inventory.attributes.websiteUri}
                    >
                      <ExternalLink className="h-4 w-4" />
                      Website
                    </Link>
                    <Link href={`/market/${inventory.account.id}`}>
                      <Button
                        size="sm"
                        variant="secondary"
                        animationType="none"
                      >
                        View Collection
                      </Button>
                    </Link>
                  </CardFooter>
                </div>
              </Card>
            );
          })}
        </div>
      </Shell>
    </div>
  );
}
