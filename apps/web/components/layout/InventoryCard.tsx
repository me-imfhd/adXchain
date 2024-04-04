"use client";
import { Button, Card, CardContent, CardFooter } from "@repo/ui/components";
import Link from "next/link";
import DeleteInventory from "./deleteInventory";

interface InventoryCardProps {
  imgURL: string;
  CollectionName: string;
  CollectionWebsite: string;
  Collectionid: string;
}

export default function InventoryCard({
  imgURL,
  CollectionName,
  CollectionWebsite,
  Collectionid,
}: InventoryCardProps) {
  return (
    <>
      <Card className="w-full max-w-xs rounded-xl border width cursor-pointer">
        <CardContent className="grid gap-4 p-4">
          <div className="aspect-square w-full overflow-hidden rounded-xl">
            <img
              alt="Product image"
              className="aspect-square object-cover border w-full"
              height="500"
              src={imgURL}
              width="400"
            />
          </div>
          <div className="grid gap-1.5">
            <h3 className="text-sm md:text-base">
              Name: <span className="font-semibold">{CollectionName}</span>
            </h3>

            <p className="text-sm md:text-base">
              Website:{" "}
              <Link
                href={`${CollectionWebsite}`}
                className="text-blue-400 hover:underline"
              >
                {CollectionWebsite}
              </Link>
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex gap-2">
          <Link href={`/inventories/${Collectionid}/edit`}>
            <Button size="sm" variant="secondary">
              Edit
            </Button>
          </Link>
          <DeleteInventory id={Collectionid}>
            <Button size="sm" variant="destructive">
              Delete
            </Button>
          </DeleteInventory>
        </CardFooter>
      </Card>
    </>
  );
}
