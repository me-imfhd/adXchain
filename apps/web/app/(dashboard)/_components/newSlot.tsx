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
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { s3Upload } from "./s3Upload";
import { useRouter } from "next/navigation";
import { insertAdSlotForm } from "@repo/db";
import { deleteS3Image } from "./s3Delete";
import Link from "next/link";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { toast } from "sonner";
import { GetInventory, createAdNFTAccount } from "@repo/api";
import { useWalletSession } from "@/lib/hooks/check-wallet";
import { Session } from "@repo/auth";
import { trpc } from "@repo/trpc/trpc/client";
export default function NewSlot({
  session,
  inventoryId,
}: {
  inventoryId: number;
  session: Session;
}) {
  const { program, anchorWallet } = useWalletSession(session);
  const [isLoading, setIsLoading] = useState(false);
  const { mutateAsync: createUnderdogNFT } =
    trpc.underdog.createUnderdogNFT.useMutation();
  const router = useRouter();
  const [image, setImage] = useState<File | null>(null);
  const form = useForm<z.infer<typeof insertAdSlotForm>>({
    resolver: zodResolver(insertAdSlotForm),
  });
  return (
    <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(async (data) => {
            setIsLoading(true);
            try {
              if (!program || !anchorWallet) {
                toast("Please try again.");
                return;
              }
              const walletAddress = anchorWallet.publicKey.toBase58();
              if (data.slotPrice < 0) {
                throw new Error("Only Positive Numbers are allowed");
              }
              if (data.slotWidth && data.slotLength) {
                if (data.slotWidth < 0 || data.slotLength < 0) {
                  throw new Error("Only Positive Numbers are allowed");
                }
              }
              if (!image) {
                throw new Error("Please upload image.");
              }
              const slotPrice = LAMPORTS_PER_SOL * data.slotPrice;
              const s3ImageUri = await s3Upload(image);
              const underdogApiEndpoint = "https://devnet.underdogprotocol.com";
              const nft = await createUnderdogNFT({
                nftBody: {
                  attributes: {
                    fileType: "",
                    displayUri: "",
                    length: data.slotLength,
                    platform: data.slotPlatform,
                    slotType: data.slotType,
                    status: "inactive",
                    websiteUri: data.slotWebsiteUri,
                    width: data.slotWidth,
                  },
                  name: data.slotName,
                  description: data.slotDescription,
                  delegated: true,
                  image: s3ImageUri,
                  receiverAddress: walletAddress,
                },
                projectId: inventoryId,
                underdogApiEndpoint,
              });
              const res = await createAdNFTAccount(
                inventoryId,
                nft.underdogNFTId,
                nft.nftMint,
                program,
                slotPrice
              );
              console.log(res.tx);
              if (!res) {
                await deleteS3Image(s3ImageUri);
              }
              toast("Ad slot created successfully.");
              router.push(`/inventories/${inventoryId}`);
              router.refresh();
              setIsLoading(false);
            } catch (err) {
              console.log(err);
              toast("INTERNAL_SERVER_ERROR", {
                description:
                  (err as Error).message ?? "Check console for errors",
              });
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
              Add New Ad Slot
            </h1>
            <div className="hidden items-center gap-2 md:ml-auto md:flex">
              <Button
                size="sm"
                type="submit"
                isLoading={isLoading}
                disabled={isLoading}
              >
                Create
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
                          <Input
                            type="text"
                            className="w-full"
                            {...field}
                            placeholder="Superteam Ad #1"
                          />
                        )}
                      />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="description">Description</Label>
                      <FormField
                        name="slotDescription"
                        control={form.control}
                        render={({ field }) => (
                          <Textarea
                            className="min-h-32"
                            {...field}
                            placeholder="Description about your adSpace"
                          />
                        )}
                      />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="name">Website URI</Label>
                      <CardDescription>
                        The Website URI of the page where ad space is supposed
                        to be listed.
                      </CardDescription>
                      <FormField
                        name="slotWebsiteUri"
                        control={form.control}
                        render={({ field }) => (
                          <Input
                            type="url"
                            className="w-full"
                            {...field}
                            placeholder="https://superteam.fun/blogs"
                          />
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
                      <Label htmlFor="slotPrice">Slot Price ( in sol )</Label>
                      <FormField
                        control={form.control}
                        name="slotPrice"
                        render={({ field }) => (
                          <Input
                            type="number"
                            className="w-full"
                            {...field}
                            {...form.register("slotPrice", {
                              valueAsNumber: true,
                            })}
                            placeholder="3.97"
                          />
                        )}
                      />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="slotWidth">Slot Width</Label>

                      <FormField
                        control={form.control}
                        name="slotWidth"
                        render={({ field }) => (
                          <Input
                            placeholder="728"
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
                            placeholder="90"
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
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue
                                placeholder="Select Ad Space"
                                defaultValue="aside"
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
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <svg
                            className="w-8 h-8 mb-4"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 16"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                            />
                          </svg>
                          <p className="mb-2 text-sm">
                            <span className="font-semibold">
                              Click to upload
                            </span>{" "}
                            or drag and drop
                          </p>
                        </div>
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
              {/* <Card>
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
                              defaultValue={field.value ?? "draft"}
                            >
                              <FormControl>
                                <SelectTrigger
                                  id="status"
                                  aria-label="Select status"
                                >
                                  <SelectValue
                                    placeholder="Select status"
                                    defaultValue="draft"
                                  />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="draft">Draft</SelectItem>
                                <SelectItem value="inactive">Inactive</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card> */}
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 md:hidden">
            <Button
              size="sm"
              type="submit"
              isLoading={isLoading}
              disabled={isLoading}
            >
              Create
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
