"use client"
import { Card } from "@repo/ui/components";
import Link from "next/link";
import { useRouter } from 'next/navigation'


interface InventoryCardProps {
 imgURL: string;
 CollectionName: string;
 CollectionWebsite: string;
 CollectionPlatform: string;
 Collectionid: string,
}

export default function InventoryCard({
 imgURL,
 CollectionName,
 CollectionPlatform,
 CollectionWebsite,
 Collectionid,
}: InventoryCardProps) {
    const router = useRouter()

 return (
    <>
    <Card className="w-full max-w-xs rounded-xl border width cursor-pointer" onClick={() => router.push(`/inventories/${Collectionid}`)}>
      <div className="grid gap-4 p-4">
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
          <h3 className="text-sm md:text-base">Name: {" "} <span className="font-semibold">{CollectionName}</span></h3>
          <h3 className="text-sm md:text-base">Platform: {" "} <span className="font-semibold">{CollectionPlatform}</span></h3>
          <p className="text-sm md:text-base">Website: {" "}<Link href={`${CollectionWebsite}`} className="text-blue-400 hover:underline">{CollectionWebsite}</Link></p>
        </div>
      </div>
    </Card>
    </>
 );
}
