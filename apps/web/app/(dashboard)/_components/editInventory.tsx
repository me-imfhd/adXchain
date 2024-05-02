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
import Link from "next/link";
import { useForm } from "react-hook-form";
import { updateInventoryParams } from "@repo/db";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { s3Upload } from "./s3Upload";
import { useRouter } from "next/navigation";
import { GetInventory } from "@repo/api";
import { deleteS3Image } from "./s3Delete";
import { toast } from "sonner";
import { trpc } from "@repo/trpc/trpc/client";
export default function EditInventory({
  inventory,
  inventoryId,
}: {
  inventory: NonNullable<GetInventory>;
  inventoryId: number;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { mutateAsync: updateUnderdogProject } =
    trpc.underdog.updateUnderdogProject.useMutation();
  const [image, setImage] = useState<File | null>(null);
  const form = useForm<z.infer<typeof updateInventoryParams>>({
    resolver: zodResolver(updateInventoryParams),
    defaultValues: {
      inventoryDescription: inventory.data.description,
      inventoryImageUri: inventory.data.image,
      inventoryName: inventory.data.name,
      inventoryWebsiteUri: inventory.data.attributes.websiteUri,
      status: inventory.data.attributes.listStatus,
    },
  });
  return (
    <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(async (data) => {
            setIsLoading(true);
            try {
              const underdogApiEndpoint = "https://devnet.underdogprotocol.com";
              if (!image) {
                const res = await updateUnderdogProject({
                  underdogApiEndpoint,
                  projectId: inventoryId,
                  nftBody: {
                    attributes: {
                      listStatus: data.status,
                      websiteUri: data.inventoryWebsiteUri,
                    },
                    description: data.inventoryDescription,
                    image: data.inventoryImageUri,
                    name: data.inventoryName,
                  },
                });
                if (res) {
                  toast("Inventory Updated Successfully");
                  router.push("/inventories");
                  router.refresh();
                  setIsLoading(false);
                }
                return;
              }
              await deleteS3Image(inventory.data.image);
              const s3ImageUri = await s3Upload(image);
              if (s3ImageUri) {
                toast("Image updated successfully.");
              }
              const res = await updateUnderdogProject({
                underdogApiEndpoint,
                projectId: inventoryId,
                nftBody: {
                  attributes: {
                    listStatus: data.status,
                    websiteUri: data.inventoryWebsiteUri,
                  },
                  description: data.inventoryDescription,
                  image: s3ImageUri,
                  name: data.inventoryName,
                },
              });
              if (res) {
                toast("Inventory updated successfully.");
                router.push("/inventories");
                router.refresh();
                setIsLoading(false);
              }
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
            <Link href={"/inventories"}>
              <Button variant="outline" size="icon" className="h-7 w-7">
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
              </Button>
            </Link>
            <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
              Update New Ad Inventory
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
                  <CardTitle>Inventory Details</CardTitle>
                  <CardDescription>
                    Fill details about your ad inventory.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    <div className="grid gap-3">
                      <Label htmlFor="name">Name</Label>
                      <FormField
                        name="inventoryName"
                        control={form.control}
                        render={({ field }) => (
                          <Input type="text" className="w-full" {...field} />
                        )}
                      />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="description">Description</Label>
                      <FormField
                        name="inventoryDescription"
                        control={form.control}
                        render={({ field }) => (
                          <Textarea
                            className="min-h-32"
                            {...field}
                            value={field.value ?? ""}
                          />
                        )}
                      />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="name">Website URI</Label>
                      <FormField
                        name="inventoryWebsiteUri"
                        control={form.control}
                        render={({ field }) => (
                          <Input
                            type="text"
                            className="w-full"
                            {...field}
                            value={field.value ?? ""}
                          />
                        )}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
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
                          src={inventory.data.image}
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
