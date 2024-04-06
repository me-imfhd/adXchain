"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type WalletAdapterProps } from "@solana/wallet-adapter-base";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Button,
  Input,
  useToast,
} from "@repo/ui/components";
import { useState } from "react";
import {
  createUnderdogNFT,
  createUnderdogProject,
  retrieveNft,
} from "@repo/api";
import { BuySlot, multipleAdSlotForm } from "@repo/db";
import { Session } from "@repo/auth";
import { s3Upload } from "../(dashboard)/_components/s3Upload";
import { deleteS3Image } from "../(dashboard)/_components/s3Delete";
import { trpc } from "@repo/trpc/trpc/client";
import { NftBodyParams } from "@repo/api/web3-ops/types";
import { SlotMap } from "../(lobby)/market/[inventory]/page";
import { useRouter } from "next/navigation";
import {
  Connection,
  SystemProgram,
  Transaction,
  sendAndConfirmTransaction,
} from "@solana/web3.js";
import { PublicKey } from "@metaplex-foundation/js";
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
const underdogApiEndpoint = "https://devnet.underdogprotocol.com";
type InventorySchema = z.infer<typeof multipleAdSlotForm>;
interface BuyAdNFTProps {
  selectedSlots: SlotMap[];
  sendTransaction: WalletAdapterProps["sendTransaction"];
  balance: bigint;
  session: Session;
  inventoryName: string;
  inventoryId: string;
  inventoryImageUri: string;
  transactionAmount: bigint;
  recieversAddress: string;
  payersAddress: PublicKey;
  connection: Connection;
}
export default function BuyMultiple({
  session,
  selectedSlots,
  connection,
  balance,
  payersAddress,
  recieversAddress,
  sendTransaction,
  transactionAmount,
  inventoryImageUri,
  inventoryName,
  inventoryId,
}: BuyAdNFTProps) {
  const [isLoading, setIsLoading] = useState(false);
  const oldProject = trpc.project.getUserProjectByInventoryId.useMutation();
  const createNft = trpc.adNft.createNftAndUpdateLent.useMutation();
  const router = useRouter();
  const createNewProject = trpc.project.createProject.useMutation();
  const toast = useToast().toast;
  const form = useForm<InventorySchema>({
    resolver: zodResolver(multipleAdSlotForm),
  });

  async function operation(
    underdogApiKey: string,
    s3ImagesUri: string[],
    web2ProjectId: string,
    underdogProjectId: number
  ) {
    try {
      const payTransaction = await sendSol(
        recieversAddress,
        payersAddress,
        transactionAmount,
        connection,
        sendTransaction
      );
      if (!payTransaction) {
        throw new Error("Transaction Not Completed, try again.");
      }
    } catch (err) {
      throw new Error((err as Error).message);
    }
    try {
      await Promise.all(
        selectedSlots.map(async (slot) => {
          const s3ImageUri = await s3Upload(slot.file!);
          s3ImagesUri.push(s3ImageUri);

          const nftBody = {
            attributes: {
              displayUri: s3ImageUri,
              fileType: slot.file!.type,
            },
            delegated: true,
            image: slot.imageUri,
            name: slot.slotName,
          } as NftBodyParams;
          console.log(nftBody);
          try {
            const nft = await createUnderdogNFT({
              projectId: underdogProjectId,
              underdogApiEndpoint,
              underdogApiKey,
              nftBody,
            });
            if (nft) {
              toast({ title: "Ad Space Initialized successfully." });
            }
            const nftMint = await retrieveNft({
              nftId: nft.nftId,
              projectId: underdogProjectId,
              underdogApiKey,
              underdogApiEndpoint,
            });
            await createNft.mutateAsync({
              adSlotId: slot.id,
              mintAddress: nftMint.mintAddress,
              nftDisplayUri: s3ImageUri,
              nftFileType: slot.file?.type!,
              projectId: web2ProjectId,
              underdogNftId: nft.nftId,
              nftRedirectUri: "",
              ownerId: session.user.id,
            });
          } catch (err) {
            throw new Error("Ad NFT creation failed.");
          }
        })
      );
      setIsLoading(false);
      toast({ title: "Operation Successful" });
      router.push(`/market`);
      return;
    } catch (error) {
      console.log(error);
      toast({
        title: "Some Nft Operation failed",
        description: (error as Error).message,
      });
    }
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(async (data) => {
            setIsLoading(true);
            const s3ImagesUri: string[] = [];
            try {
              // Validate files
              selectedSlots.forEach(({ file }) => {
                if (!file) {
                  throw new Error("File Not Found");
                }
                if (!ACCEPTED_IMAGE_MIME_TYPES.includes(file.type)) {
                  throw new Error("Format not supported");
                }
                if (!(file.size <= MAX_FILE_SIZE)) {
                  throw new Error("Max image size is 5mb.");
                }
              });

              const projectAlreadyExist = await oldProject.mutateAsync({
                id: inventoryId,
              });

              if (!projectAlreadyExist?.underdogProjectId) {
                const underdogProject = await createUnderdogProject({
                  inventoryImageUri: inventoryImageUri,
                  inventoryName: inventoryName,
                  underdogApiEndpoint,
                  underdogApiKey: data.underdogApi,
                });
                const web2Project = await createNewProject.mutateAsync({
                  collectionMintAddress: underdogProject.mintAddress,
                  inventoryId,
                  underdogProjectId: underdogProject.projectId,
                  userId: session.user.id,
                });
                await operation(
                  data.underdogApi,
                  s3ImagesUri,
                  web2Project.project.id,
                  web2Project.project.underdogProjectId
                );
              } else {
                await operation(
                  data.underdogApi,
                  s3ImagesUri,
                  projectAlreadyExist.id,
                  projectAlreadyExist.underdogProjectId
                );
              }
            } catch (err) {
              console.log(err);
              setIsLoading(false);
              toast({
                title: "Operation Failed",
                description: (err as Error).message,
              });
              await Promise.all(
                s3ImagesUri.map(
                  async (s3ImageUri) => await deleteS3Image(s3ImageUri)
                )
              );
            }
          })}
          className="space-y-8"
        >
          <FormField
            control={form.control}
            name="underdogApi"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Underdog api key</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" isLoading={isLoading} disabled={isLoading}>
            Buy
          </Button>
        </form>
      </Form>
    </>
  );
}

async function retry(fn: any, retries: number, delayMs: number) {
  let lastError = null;
  console.log("try/retry");
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      if (attempt < retries) {
        await delay(delayMs);
      }
    }
  }

  throw lastError;
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const sendSol = async (
  recieverAddress: string,
  payerPublicKey: PublicKey,
  amountLamports: bigint,
  connection: Connection,
  sendTransaction: WalletAdapterProps["sendTransaction"]
) => {
  const transaction = new Transaction();
  const recipientPubKey = new PublicKey(recieverAddress);

  const sendSolInstruction = SystemProgram.transfer({
    fromPubkey: payerPublicKey,
    toPubkey: recipientPubKey,
    lamports: Number(amountLamports),
  });

  transaction.add(sendSolInstruction);
  const tx = await sendTransaction(transaction, connection);
  console.log(tx);
  return tx;
};
