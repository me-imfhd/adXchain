import { Button, Card, CardContent, CardFooter } from "@repo/ui/components";
import Link from "next/link";

interface InventoryCardProps {
  imgURL: string;
  CollectionName: string;
  CollectionWebsite: string;
  Collectionid: number;
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
          <div className="grid gap-3">
            <div className="flex flex-row items-center justify-between">
              <h3 className="font-semibold text-2xl">{CollectionName}</h3>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-sm leading-none flex gap-2 justify-between">
                <span className="text-muted-foreground font-medium ">
                  WEBSITE
                </span>
                <Link href={CollectionWebsite}>
                  <span className="flex items-center hover:underline hover:-translate-y-[1px] gap-1 ">
                    {CollectionWebsite}
                  </span>
                </Link>
              </p>
              {/* <p className="text-sm leading-none flex gap-2 justify-between">
                  <span className="text-muted-foreground font-medium ">
                    MINT
                  </span>
                  <Link
                    href={`https://explorer.solana.com/address/${inventory.mintAddress}?cluster=devnet`}
                  >
                    <span className="flex items-center hover:underline hover:-translate-y-[1px] gap-1 ">
                      <ExternalLinkIcon className="h-3 w-3" />
                      {wa}
                    </span>
                  </Link>
                </p> */}
            </div>
          </div>
          <Link href={`/inventories/${Collectionid}/edit`}>
            <Button size="sm" variant="secondary">
              Edit
            </Button>
          </Link>
        </CardContent>
        {/* <CardFooter className="flex gap-2"></CardFooter> */}
      </Card>
    </>
  );
}
function ExternalLinkIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" x2="21" y1="14" y2="3" />
    </svg>
  );
}
