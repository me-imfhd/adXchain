"use client";
import { type WalletAdapterProps } from "@solana/wallet-adapter-base";
import { useState } from "react";
import { lendAdNFT, s3Upload } from "@repo/api";
import { useRouter } from "next/navigation";
import { Connection, Transaction } from "@solana/web3.js";
import { SlotMap } from "../market/[inventory]/page";
import { GlowingButton } from "@repo/ui/components/buttons";
import { toast } from "sonner";
import { Contract, anchor } from "@repo/contract";
import { trpc } from "@repo/trpc/trpc/client";
import { catchError } from "@/lib/utils";
const MAX_FILE_SIZE = 1024 * 1024 * 5;
const ACCEPTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/gif",
  "video/webm",
  "video/mp4",
];
interface BuyAdNFTProps {
  selectedSlots: SlotMap[];
  sendTransaction: WalletAdapterProps["sendTransaction"];
  inventoryId: number;
  transactionAmount: number;
  renterAddress: string;
  lenderAddress: string;
  connection: Connection;
  program: anchor.Program<Contract> | undefined;
}
export default function BuyMultiple({
  selectedSlots,
  connection,
  renterAddress,
  sendTransaction,
  transactionAmount,
  lenderAddress,
  inventoryId,
  program,
}: BuyAdNFTProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { mutateAsync: updateUnderdogNFT } =
    trpc.underdog.updateUnderdogNFT.useMutation();
  return (
    <>
      <GlowingButton
        onClick={async () => {
          if (!program) {
            router.refresh();
            throw new Error("Please try again.");
          }
          setIsLoading(true);
          const s3ImagesUri: string[] = [];
          try {
            const transaction = new Transaction();
            const underdogApiEndpoint = "https://devnet.underdogprotocol.com";
            await Promise.all(
              selectedSlots.map(async (adNFT) => {
                if (!adNFT.file) {
                  throw new Error("File Not Found");
                }
                if (!ACCEPTED_IMAGE_MIME_TYPES.includes(adNFT.file.type)) {
                  throw new Error("Format not supported");
                }
                if (!(adNFT.file.size <= MAX_FILE_SIZE)) {
                  throw new Error("Max image size is 5mb.");
                }
                let s3ImageUri: string | null = null;
                toast.promise(s3Upload(adNFT.file), {
                  loading: "Uploading Slot Image...",
                  success: (imageURI) => {
                    s3ImageUri = imageURI;
                    return "Image Uploaded Successfully.";
                  },
                  error: (data) => {
                    console.log(data);
                    throw new Error("Image Upload Failed, Please try again.");
                  },
                });
                if (!s3ImageUri) {
                  return;
                }
                // transfer the nft
                // await transferUnderdogNFT({
                //   projectId: inventoryId,
                //   underdogApiEndpoint,
                //   underdogApiKey,
                //   nftId: adNFT.id,
                //   receiverAddress: renterAddress,
                // });
                // set the ad
                await updateUnderdogNFT({
                  nftId: adNFT.id,
                  nftBody: {
                    attributes: {
                      ...adNFT.attributes,
                      displayUri: s3ImageUri,
                      fileType: adNFT.file?.type!,
                    },
                    description: adNFT.description,
                    image: adNFT.imageUri,
                    name: adNFT.slotName,
                  },
                  projectId: inventoryId,
                  underdogApiEndpoint,
                });
                toast.success(
                  `Successfully Uploaded Ad for ${adNFT.slotName} Ad Space.`
                );
                // set lender on chain
                const trx = await lendAdNFT(
                  inventoryId,
                  adNFT.id,
                  program,
                  adNFT.price,
                  lenderAddress
                );
                transaction.add(trx.tx);
                s3ImagesUri.push(s3ImageUri);
              })
            );
            const tx = await sendTransaction(transaction, connection);
            setIsLoading(false);
            toast.success("Ad Space Lent Successfully 🎉");
            toast.info(
              "Your Ad will be live once validated on-chain, it can take upto several hours."
            );
            router.push("/myNfts");
          } catch (err) {
            catchError(err);
            setIsLoading(false);
            return;
          }
        }}
        className="w-full"
        isLoading={isLoading}
        disabled={isLoading}
      >
        Buy
      </GlowingButton>
    </>
  );
}
