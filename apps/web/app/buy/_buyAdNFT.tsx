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
} from "@repo/ui/components";
import { useEffect, useState } from "react";
import NFTDemo from "@/components/layout/NFTDemo";
import {
  GetAdSlotById,
  createUnderdogNFT,
  createUnderdogProject,
} from "@repo/api";
import { inventoryAndAdSlotSchema } from "@repo/db";
import { Session } from "@repo/auth";
import { s3Upload } from "../(dashboard)/_components/s3Upload";
import { deleteS3Image } from "../(dashboard)/_components/s3Delete";
import { trpc } from "@repo/trpc/trpc/client";

const underdogApiEndpoint = "https://devnet.underdogprotocol.com";
type InventorySchema = z.infer<typeof inventoryAndAdSlotSchema>;
interface BuyAdNFTProps {
  slot: NonNullable<GetAdSlotById>;
  session: Session;
}
export default function BuyAdNFT({ slot, session }: BuyAdNFTProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const buySlot = trpc.adSlots.buySlot.useMutation();
  const form = useForm<InventorySchema>({
    resolver: zodResolver(inventoryAndAdSlotSchema),
    defaultValues: {
      ...slot,
      inventoryName: slot.inventory.inventoryName,
      inventoryImageUri: slot.inventory.inventoryImageUri!,
      ownerAddress: session.user.walletAddress,
      files: null,
      ownerEmail: session.user.email,
      slotPrice: slot.slotPrice,
    },
  });

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(async (data) => {
            setIsLoading(true);
            try {
              if (!file) {
                throw new Error("Please upload your display ad file.");
              }
              if (!data.ownerAddress) {
                throw new Error("No wallet address found");
              }
              const project = await createUnderdogProject({
                inventoryImageUri: data.inventoryImageUri!,
                inventoryName: data.inventoryName,
                underdogApiEndpoint,
                underdogApiKey: data.underdogApi,
              });
              const s3DisplayUri = await s3Upload(data.files[0]);
              try {
                const nft = await createUnderdogNFT({
                  projectId: project.projectId,
                  underdogApiEndpoint,
                  underdogApiKey: data.underdogApi,
                  nftBody: {
                    attributes: {
                      displayUri: s3DisplayUri,
                      fileType: file.type,
                    },
                    delegated: true,
                    image: slot.slotImageUri!,
                    name: slot.slotName,
                    receiverAddress: data.ownerAddress!,
                  },
                });
                await buySlot.mutateAsync({
                  id: data.id,
                  lent: true,
                  mintAddress: nft.mintAddress,
                  ownerAddress: data.ownerAddress,
                  ownerEmail: data.ownerEmail,
                });
                setIsLoading(false);
              } catch (e) {
                await deleteS3Image(s3DisplayUri);
                throw new Error("Nft creation failed.");
              }
            } catch (err) {
              console.log(err);
              setIsLoading(false);
            }
          })}
          className="space-y-8"
        >
          <FormField
            control={form.control}
            name="files"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    onBlur={field.onBlur}
                    name={field.name}
                    onChange={(e) => {
                      field.onChange(e.target.files);
                      setFile(e.target.files?.[0] || null);
                    }}
                    ref={field.ref}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
          <FormField
            control={form.control}
            name="ownerAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Owner Address</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    {...field}
                    value={session.user.walletAddress!}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="ownerEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Owner Email</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    {...field}
                    value={
                      session.user.email && session.user.email !== `undefined`
                        ? session.user.email
                        : ""
                    }
                  />
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
      <NFTDemo NFTImage={file || null} />
    </>
  );
}
