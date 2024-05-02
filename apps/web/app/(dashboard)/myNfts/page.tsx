import React from "react";
import {
  Button,
  Card,
  CardContent,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/components";
import {
  ExternalLink,
  ListFilter,
  MoreHorizontal,
  PlusCircle,
} from "@repo/ui/icons";
import Link from "next/link";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { rentingAdNFTs } from "@repo/api";
import { checkAuth } from "@repo/auth";
import UpdateAd from "./_updateAd";
import { unstable_noStore } from "next/cache";

export default async function Page() {
  unstable_noStore();
  const session = await checkAuth();
  const adNFTs = await rentingAdNFTs(session.user.id);

  return (
    <>
      <div className="flex flex-1 min-h-[100vh] flex-col gap-4 lg:gap-6 lg:p-6">
        <div className="flex items-center">
          <h2 className="scroll-m-20 font-bold tracking-tight xs:text-xl md:text-4xl lg:text-5xl">
            Your Rented Ad Spaces
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
            <Link href={`/market`}>
              <Button size="sm" className="h-8 gap-1">
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Explore
                </span>
              </Button>
            </Link>
          </div>
        </div>
        {adNFTs.length === 0 ? (
          <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
            <div className="flex flex-col items-center gap-1 text-center">
              <h3 className="text-2xl font-bold tracking-tight">
                You are currently not renting any Ad NFTs.
              </h3>
              <p className="text-sm text-muted-foreground">
                Rent/Buy some Ad NFTs to list your ads.
              </p>
              <Link href={`/market`}>
                <Button className="mt-4">Explore</Button>
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
                      <TableHead className="font-semibold">Ad Image</TableHead>
                      <TableHead className="hidden md:table-cell font-semibold">
                        Bought at
                      </TableHead>
                      <TableHead className="hidden md:table-cell font-semibold">
                        Ad Space Type
                      </TableHead>
                      <TableHead className="hidden md:table-cell font-semibold">
                        Jump to Ad
                      </TableHead>
                      <TableHead className="font-semibold">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {adNFTs.map((ad) => {
                      const wa =
                        ad.publicKey.toString()?.slice(0, 4) +
                        ".." +
                        ad.publicKey.toString()?.slice(-4);
                      return (
                        <TableRow>
                          <TableCell className="hidden sm:table-cell">
                            <img
                              alt="Product image"
                              className="aspect-square rounded-md object-cover"
                              height="64"
                              src={ad.image}
                              width="64"
                            />
                          </TableCell>
                          <TableCell>{ad.name}</TableCell>
                          <TableCell className="hidden sm:table-cell">
                            <img
                              alt="Product image"
                              className="aspect-square rounded-md object-cover"
                              height="64"
                              src={ad.attributes.displayUri}
                              width="64"
                            />
                          </TableCell>

                          <TableCell className="hidden md:table-cell">
                            <div className="flex gap-1 items-center">
                              <svg
                                version="1.1"
                                id="Layer_1"
                                xmlns="http://www.w3.org/2000/svg"
                                x="0"
                                y="0"
                                width="16px"
                                height="16px"
                                viewBox="0 0 450 352.69"
                              >
                                <path
                                  d="M64.6 237.9c2.4-2.4 5.7-3.8 9.2-3.8h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1l62.7-62.7z"
                                  style={{ fill: "white" }}
                                ></path>
                                <path
                                  d="M64.6 3.8C67.1 1.4 70.4 0 73.8 0h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1L64.6 3.8z"
                                  style={{ fill: "white" }}
                                ></path>
                                <path
                                  d="M333.1 120.1c-2.4-2.4-5.7-3.8-9.2-3.8H6.5c-5.8 0-8.7 7-4.6 11.1l62.7 62.7c2.4 2.4 5.7 3.8 9.2 3.8h317.4c5.8 0 8.7-7 4.6-11.1l-62.7-62.7z"
                                  style={{ fill: "white" }}
                                ></path>
                              </svg>
                              <span>
                                {Number(ad.account.priceLamports) /
                                  LAMPORTS_PER_SOL}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {ad.attributes.slotType.toUpperCase()}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            <Link
                              href={`${ad.attributes.websiteUri}/#${ad.publicKey.toBase58()}`}
                              title={`${ad.attributes.websiteUri}/#${ad.publicKey.toBase58()}`}
                            >
                              <span className="flex items-center hover:underline hover:-translate-y-[1px] gap-1 ">
                                <ExternalLink className="h-3 w-3" />
                                {wa}
                              </span>
                            </Link>
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
                                <UpdateAd
                                  adImage={ad.attributes.displayUri}
                                  inventoryId={Number(ad.projectId)}
                                  nftId={Number(ad.account.id)}
                                  nftBody={{
                                    attributes: { ...ad.attributes },
                                    description: ad.description,
                                    image: ad.image,
                                    name: ad.name,
                                  }}
                                />
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      );
                    })}
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
