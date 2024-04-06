"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { createUnderdogNFT, createUnderdogProject } from "@repo/api";
import {
  AdSlot,
  BuySlot,
  SelectedSlotSchema,
  multipleAdSlotForm,
} from "@repo/db";
import { Session } from "@repo/auth";
import { s3Upload } from "../(dashboard)/_components/s3Upload";
import { deleteS3Image } from "../(dashboard)/_components/s3Delete";
import { trpc } from "@repo/trpc/trpc/client";
import { NftBodyParams } from "@repo/api/web3-ops/types";
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
  selectedSlots: SelectedSlotSchema[];
  session: Session;
  inventoryName: string;
  inventoryImageUri: string;
  transactionAmount: bigint;
  files: File[];
}
export default function BuyMultiple({
  selectedSlots,
  files,
  session,
  inventoryImageUri,
  inventoryName,
}: BuyAdNFTProps) {
  const [isLoading, setIsLoading] = useState(false);
  const buyMultipleSlots = trpc.adSlots.buyMultipleSlots.useMutation();
  const toast = useToast().toast;
  const form = useForm<InventorySchema>({
    resolver: zodResolver(multipleAdSlotForm),
    defaultValues: {
      slotArray: [...selectedSlots],
      inventoryName,
      inventoryImageUri,
      ownerAddress: session.user.walletAddress!,
      ownerEmail: session.user.email!,
    },
  });

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(async (data) => {
            console.log(files);
            setIsLoading(true);
            console.log(files?.length, data.slotArray.length);
            try {
              if (!files || files.length !== data.slotArray.length) {
                throw new Error("Please upload your display ad file.");
              }
              files.map((file) => {
                if (!ACCEPTED_IMAGE_MIME_TYPES.includes(file.type)) {
                  throw new Error("Format not supported");
                }
                if (!(file.size <= MAX_FILE_SIZE)) {
                  throw new Error("Max image size is 5mb.");
                }
              });
              if (!data.ownerAddress) {
                throw new Error("No wallet address found");
              }
              const project = await createUnderdogProject({
                inventoryImageUri: data.inventoryImageUri!,
                inventoryName: data.inventoryName,
                underdogApiEndpoint,
                underdogApiKey: data.underdogApi,
              });
              if (project.projectId) {
                console.log("Underdog Project Created");
              }
              const s3ImagesUri: Array<string> = [];
              const buy: BuySlot[] = [];
              try {
                const slotArray: NftBodyParams[] = [];
                console.log("Uploading images");
                for (let i = 0; i < data.slotArray.length; i++) {
                  const s3ImageUri = await s3Upload(files[i]!);
                  s3ImagesUri.push(s3ImageUri);
                  const nftBody = {
                    attributes: {
                      displayUri: s3ImageUri,
                      fileType: files[i]?.type,
                    },
                    delegated: true,
                    image: data.slotArray[i]?.slotImageUri,
                    name: data.slotArray[i]?.slotName,
                    receiverAddress: data.ownerAddress,
                  } as NftBodyParams;
                  const nft = await createUnderdogNFT({
                    projectId: project.projectId,
                    underdogApiEndpoint,
                    underdogApiKey: data.underdogApi,
                    nftBody,
                  });
                  // buy.push({
                  //   id: data.slotArray[i]?.id!,
                  //   lent: true,
                  //   mintAddress: nft.mintAddress,
                  //   ownerAddress: data.ownerAddress,
                  // });
                }
                // update database slots table
                await buyMultipleSlots.mutateAsync(buy);

                setIsLoading(false);
              } catch (e) {
                s3ImagesUri.map(
                  async (s3ImageUri) => await deleteS3Image(s3ImageUri)
                );
                throw new Error("Nft creation failed.");
              }
            } catch (err) {
              console.log(err);
              toast({
                title: "Operation Failed",
                description: (err as Error).message,
              });
              setIsLoading(false);
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
