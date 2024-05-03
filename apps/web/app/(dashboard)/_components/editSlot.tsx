"use client";
import React, { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from "@repo/ui/components";
import { ChevronLeft } from "@repo/ui/icons";
import { useForm } from "react-hook-form";
import { editAdSlotForm } from "@repo/db";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { s3Upload } from "./s3Upload";
import { useRouter } from "next/navigation";
import { GetAdNFT } from "@repo/api";
import { deleteS3Image } from "./s3Delete";
import Link from "next/link";
import { toast } from "sonner";
import { useWalletSession } from "@/lib/hooks/check-wallet";
import { Session } from "@repo/auth";
import { trpc } from "@repo/trpc/trpc/client";
import { validateImage } from "@/lib/validate-image";
import { catchError } from "@/lib/utils";
export default function EditSlot({
  adNFT,
  inventoryId,
  session,
}: {
  adNFT: NonNullable<GetAdNFT>;
  inventoryId: number;
  session: Session;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const { program } = useWalletSession(session);
  const router = useRouter();
  const { mutateAsync: updateUnderdogNFT } =
    trpc.underdog.updateUnderdogNFT.useMutation();
  const [image, setImage] = useState<File | null>(null);
  const form = useForm<z.infer<typeof editAdSlotForm>>({
    resolver: zodResolver(editAdSlotForm),
    defaultValues: {
      slotDescription: adNFT.description,
      slotLength: adNFT.attributes.length,
      slotName: adNFT.name,
      slotPlatform: adNFT.attributes.platform,
      slotType: adNFT.attributes.slotType,
      slotWebsiteUri: adNFT.attributes.websiteUri,
      slotWidth: adNFT.attributes.width,
      status: adNFT.attributes.status,
    },
  });
  return (
    <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(async (data) => {
            setIsLoading(true);
            try {
              if (data.slotWidth && data.slotLength) {
                if (data.slotWidth < 0 || data.slotLength < 0) {
                  throw new Error("Only Positive Numbers are allowed");
                }
              }

              if (!program) {
                router.refresh();
                throw new Error("Please try again");
              }
              const underdogApiEndpoint = "https://devnet.underdogprotocol.com";

              if (!image) {
                await updateUnderdogNFT({
                  nftId: adNFT.id,
                  nftBody: {
                    attributes: {
                      displayUri: adNFT.attributes.displayUri,
                      fileType: adNFT.attributes.fileType,
                      length: data.slotLength,
                      platform: data.slotPlatform,
                      slotType: data.slotType,
                      status: data.status,
                      websiteUri: data.slotWebsiteUri,
                      width: data.slotWidth,
                    },
                    name: data.slotName,
                    description: data.slotDescription,
                    image: adNFT.image,
                  },
                  projectId: inventoryId,
                  underdogApiEndpoint,
                });
                toast.success("Ad NFT Updated Successfully.");
                toast.info(
                  "Metadata updates will occur once validated on-chain, it can take upto several hours."
                );
                router.push(`/inventories/${inventoryId}`);
                router.refresh();
                setIsLoading(false);
                return;
              }
              const img = validateImage(image);
              let s3ImageUri: string | null = null;
              toast.promise(s3Upload(image), {
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
              await updateUnderdogNFT({
                nftId: adNFT.id,
                nftBody: {
                  attributes: {
                    displayUri: adNFT.attributes.displayUri,
                    fileType: adNFT.attributes.fileType,
                    length: data.slotLength,
                    platform: data.slotPlatform,
                    slotType: data.slotType,
                    status: data.status,
                    websiteUri: data.slotWebsiteUri,
                    width: data.slotWidth,
                  },
                  name: data.slotName,
                  description: data.slotDescription,
                  image: s3ImageUri,
                },
                projectId: inventoryId,
                underdogApiEndpoint,
              });
              toast.success("Ad NFT Updated Successfully.");
              toast.info(
                "Metadata updates will occur once validated on-chain, it can take upto several hours."
              );
              router.push(`/inventories/${inventoryId}`);
              router.refresh();
              setIsLoading(false);
            } catch (err) {
              catchError(err);
              setIsLoading(false);
            }
          })}
        >
          <div className="flex items-center gap-4">
            <Link href={`/inventories/${inventoryId}`}>
              <Button variant="outline" size="icon" className="h-7 w-7">
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
              </Button>
            </Link>
            <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
              Update Ad Slot
            </h1>
            <div className="hidden items-center gap-2 md:ml-auto md:flex">
              <Button
                size="sm"
                type="submit"
                isLoading={isLoading}
                disabled={isLoading}
              >
                Save
              </Button>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8 pt-4">
            <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Ad slot Details</CardTitle>
                  <CardDescription>
                    Fill details about your ad slot.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    <div className="grid gap-3">
                      <Label htmlFor="name">Name</Label>
                      <FormField
                        name="slotName"
                        control={form.control}
                        render={({ field }) => (
                          <Input type="text" className="w-full" {...field} />
                        )}
                      />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="description">Description</Label>
                      <FormField
                        name="slotDescription"
                        control={form.control}
                        render={({ field }) => (
                          <Textarea className="min-h-32" {...field} />
                        )}
                      />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="name">Website URI</Label>
                      <FormField
                        name="slotWebsiteUri"
                        control={form.control}
                        render={({ field }) => (
                          <Input type="text" className="w-full" {...field} />
                        )}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>More Details</CardTitle>
                  <CardDescription>
                    Estimated lenght width of your ad space on 100% zoom and
                    price of your slot.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 sm:grid-cols-3">
                    <div className="grid gap-3">
                      <Label htmlFor="slotWidth">Slot Width</Label>

                      <FormField
                        control={form.control}
                        name="slotWidth"
                        render={({ field }) => (
                          <Input
                            type="number"
                            className="w-full"
                            {...field}
                            {...form.register("slotWidth", {
                              valueAsNumber: true,
                            })}
                          />
                        )}
                      />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="slotLength">Slot Length</Label>
                      <FormField
                        control={form.control}
                        name="slotLength"
                        render={({ field }) => (
                          <Input
                            type="number"
                            className="w-full"
                            {...field}
                            {...form.register("slotLength", {
                              valueAsNumber: true,
                            })}
                          />
                        )}
                      />
                    </div>
                    <div>
                      <Label htmlFor="platform">Platform</Label>
                      <FormField
                        control={form.control}
                        name="slotPlatform"
                        render={({ field }) => (
                          <FormItem>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select Platform" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="mobile">
                                  Mobile App
                                </SelectItem>
                                <SelectItem value="web">Web App</SelectItem>
                                <SelectItem value="billboard">
                                  Billboard
                                </SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Ad Space Type</CardTitle>
                  <CardDescription>
                    Select the type of ad space are your listing.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="slotType"
                    render={({ field }) => (
                      <FormItem>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value ?? ""}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue
                                placeholder="Select Ad Space"
                                defaultValue={field.value}
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="banner">Banner Ad</SelectItem>
                            <SelectItem value="popup">Pop Up Ad</SelectItem>
                            <SelectItem value="aside">Aside Ad</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
              <Card className="overflow-hidden">
                <CardHeader>
                  <CardTitle>Ad Inventory Image</CardTitle>
                  <CardDescription>
                    Upload Image for your ad inventory.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center w-full">
                    <label
                      htmlFor="dropzone-file"
                      className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer px-2"
                    >
                      {image ? (
                        <img
                          src={URL.createObjectURL(new Blob([image]))}
                          alt={"NFTImage"}
                          height={200}
                          width={200}
                        />
                      ) : (
                        <img
                          src={adNFT.image}
                          alt={"NFTImage"}
                          height={200}
                          width={200}
                        />
                      )}
                      <input
                        id="dropzone-file"
                        type="file"
                        className="hidden"
                        onChange={(e) => {
                          setImage(e.target.files?.[0] || null);
                        }}
                      />
                    </label>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    <div className="grid gap-3">
                      <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                          <FormItem>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger
                                  id="status"
                                  aria-label="Select status"
                                >
                                  <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="inactive">
                                  Inactive
                                </SelectItem>
                                <SelectItem value="active">Active</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 md:hidden">
            <Button
              size="sm"
              type="submit"
              isLoading={isLoading}
              disabled={isLoading}
            >
              Save
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
