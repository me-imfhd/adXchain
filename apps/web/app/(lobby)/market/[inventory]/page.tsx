import Trade from "@/components/landing-page/Trade";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { api } from "@repo/trpc";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  Input,
  Shell,
  TypographyH3,
} from "@repo/ui/components";
import {
  ExternalLink,
  Home,
  LineChart,
  Package,
  Package2,
  SearchIcon,
  ShoppingCart,
  Users2,
} from "@repo/ui/icons";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
export default async function InventoryPage({
  params: { inventory },
}: {
  params: { inventory: string };
}) {
  const i = await api.inventory.getInventoryById.query({ id: inventory });
  if (!i) {
    notFound();
  }
  const { lent, total } = await api.adSlots.getSlotCountInInventory.query({
    id: inventory,
  });
  const supply = total - lent;
  const percentage = (supply / total) * 100;
  return (
    <div className="flex flex-col items-center justify-center mt-14  w-full">
      <div className="grid md:grid-cols-[300px_1fr] gap-4 min-h-screen">
        <div className="flex flex-col gap-2 h-full md:border-r ">
          <img
            alt="Store image"
            className="aspect-video object-cover"
            height="200"
            src={i.inventoryImageUri!}
            width="300"
          />
          <div className="flex flex-col p-2 gap-2">
            <h1 className="font-bold text-2xl">{i.inventoryName}</h1>
            <div className="grid gap-2 text-sm leading-loose">
              <p>{i.inventoryDescription}</p>
            </div>
          </div>
        </div>
        <div>
          {i.adSlots.length > 0 && (
            <div className="flex flex-wrap p-4 gap-8">
              <div className="text-center">
                <TypographyH3>{i.adSlots[0]?.slotPrice}</TypographyH3>
                <TypographyH3 className="text-muted-foreground font-normal">
                  BUY NOW
                </TypographyH3>
              </div>
              <div className="text-center">
                <TypographyH3>
                  {supply}/{total} &nbsp; [{percentage}]{" %"}
                </TypographyH3>
                <TypographyH3 className="text-muted-foreground font-normal">
                  LISTED/SUPPLY
                </TypographyH3>
              </div>
            </div>
          )}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 items-start">
            {i.adSlots.length === 0
              ? "This inventory has not ad slots listed."
              : i.adSlots.map((adSlot) => {
                  const walletAddress = adSlot.ownerAddress;
                  const wa =
                    walletAddress?.slice(0, 4) +
                    ".." +
                    walletAddress?.slice(-4);
                  return (
                    <Card className="rounded-xl">
                      <div className="flex flex-col gap-1">
                        <div className="aspect-video overflow-hidden ">
                          <img
                            alt="Collection Image"
                            className="object-cover rounded-xl"
                            height="225"
                            src={adSlot.slotImageUri!}
                            style={{
                              aspectRatio: "400/225",
                              objectFit: "cover",
                            }}
                            width="400"
                          />
                        </div>
                        <CardContent className="pt-3 px-2">
                          <div className="grid gap-3">
                            <div className="flex flex-row items-center justify-between">
                              <h3 className="font-semibold text-xl">
                                {adSlot.slotName}
                              </h3>
                              <Badge
                                className="bg-secondary text-primary font-medium "
                                size={"xs"}
                              >
                                {adSlot.slotPlatform}
                              </Badge>
                            </div>
                            <div className="flex flex-col gap-1">
                              <p className="text-sm leading-none flex justify-between gap-2">
                                <span className="text-muted-foreground font-medium">
                                  Floor Price :
                                </span>
                                <span>{adSlot.slotPrice} sol</span>
                              </p>
                              <p className="text-sm leading-none flex justify-between gap-2">
                                <span className="text-muted-foreground font-medium">
                                  Slot Area :
                                </span>
                                <span>{`${adSlot.slotWidth}% x ${adSlot.slotLength}% `}</span>
                              </p>
                              <p className="text-sm leading-none flex justify-between gap-2">
                                <span className="text-muted-foreground font-medium">
                                  Ad Space Type :
                                </span>
                                <span>{adSlot.slotType}</span>
                              </p>
                              {adSlot.ownerAddress?.length &&
                                adSlot.ownerAddress?.length > 1 && (
                                  <p className="text-sm leading-none flex justify-between gap-2">
                                    <span className="text-muted-foreground font-medium">
                                      Renter :
                                    </span>
                                    <span>{wa}</span>
                                  </p>
                                )}
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="flex items-center justify-between">
                          <Link
                            className="flex items-center gap-2 hover:underline  hover:-translate-y-[1px]"
                            href={adSlot.slotWebsiteUri}
                          >
                            <ExternalLink className="h-4 w-4" />
                            Website
                          </Link>
                        </CardFooter>
                      </div>
                    </Card>
                  );
                })}
          </div>
        </div>
      </div>
    </div>
  );
}
