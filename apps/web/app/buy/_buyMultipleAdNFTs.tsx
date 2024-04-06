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
import { BuySlot, multipleAdSlotForm } from "@repo/db";
import { Session } from "@repo/auth";
import { s3Upload } from "../(dashboard)/_components/s3Upload";
import { deleteS3Image } from "../(dashboard)/_components/s3Delete";
import { trpc } from "@repo/trpc/trpc/client";
import { NftBodyParams } from "@repo/api/web3-ops/types";
import { SlotMap } from "../(lobby)/market/[inventory]/page";
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
  session: Session;
  inventoryName: string;
  inventoryId: string;
  inventoryImageUri: string;
  transactionAmount: bigint;
}
export default function BuyMultiple({
  session,
  selectedSlots,
  transactionAmount,
  inventoryImageUri,
  inventoryName,
  inventoryId,
}: BuyAdNFTProps) {
  const [isLoading, setIsLoading] = useState(false);
  const oldProject = trpc.project.getUserProjectByInventoryId.useMutation();
  const createNft = trpc.adNft.createNftAndUpdateLent.useMutation();
  const createNewProject = trpc.project.createProject.useMutation();
  const toast = useToast().toast;
  const form = useForm<InventorySchema>({
    resolver: zodResolver(multipleAdSlotForm),
  });

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
              console.log("1. Image Validation Passed");

              // Check if project already exists
              const projectAlreadyExist = await oldProject.mutateAsync({
                id: inventoryId,
              });

              if (!projectAlreadyExist?.underdogProjectId) {
                // Create new project if it doesn't exist
                const underdogProject = await createUnderdogProject({
                  inventoryImageUri: inventoryImageUri,
                  inventoryName: inventoryName,
                  underdogApiEndpoint,
                  underdogApiKey: data.underdogApi,
                });
                console.log(
                  "2. Underdog Project Created: ",
                  underdogProject.projectId
                );

                const web2Project = await createNewProject.mutateAsync({
                  collectionMintAddress: underdogProject.mintAddress,
                  inventoryId,
                  underdogProjectId: underdogProject.projectId,
                  userId: session.user.id,
                });
                console.log(
                  "3. adXchain Project for underdog project created: ",
                  web2Project.project.id
                );

                // Create NFTs
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
                    const nft = await createUnderdogNFT({
                      projectId: underdogProject.projectId,
                      underdogApiEndpoint,
                      underdogApiKey: data.underdogApi,
                      nftBody,
                    });
                    console.log("Underdog Nft Created Successfully.");

                    await createNft.mutateAsync({
                      adSlotId: { id: slot.id },
                      nftDisplayUri: s3ImageUri,
                      nftFileType: slot.file?.type!,
                      nftMintAddress: null,
                      projectId: web2Project.project.id,
                      underdogNftId: nft.nftId,
                      nftRedirectUri: "",
                    });
                    console.log("Ad NFT created and lent set to true.");
                  })
                );
              } else {
                // If project exists, create NFTs for existing project
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
                    const nft = await createUnderdogNFT({
                      projectId: projectAlreadyExist?.underdogProjectId,
                      underdogApiEndpoint,
                      underdogApiKey: data.underdogApi,
                      nftBody,
                    });
                    console.log("Underdog Nft created", nft);

                    await createNft.mutateAsync({
                      adSlotId: { id: slot.id },
                      nftDisplayUri: s3ImageUri,
                      nftFileType: slot.file?.type!,
                      projectId: projectAlreadyExist?.id,
                      nftMintAddress: null,
                      underdogNftId: nft.nftId,
                      nftRedirectUri: "",
                    });
                  })
                );
              }
            } catch (err) {
              console.log(err);
              await Promise.all(
                s3ImagesUri.map(
                  async (s3ImageUri) => await deleteS3Image(s3ImageUri)
                )
              );
              setIsLoading(false);
              toast({
                title: "Operation Failed",
                description: (err as Error).message,
              });
            } finally {
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
