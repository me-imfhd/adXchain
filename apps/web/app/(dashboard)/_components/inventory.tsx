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
  useToast,
} from "@repo/ui/components";
import { ChevronLeft } from "@repo/ui/icons";
import { trpc } from "@repo/trpc/trpc/client";
import { useForm } from "react-hook-form";
import { type Inventory, insertInventoryForm } from "@repo/db";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { s3Upload } from "./s3Upload";
import { useRouter } from "next/navigation";
import { deleteS3Image } from "./s3Delete";
import Link from "next/link";
export default function Inventory() {
  const createInventory = trpc.inventory.createInventory.useMutation();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const toast = useToast();
  const [image, setImage] = useState<File | null>(null);
  const form = useForm<z.infer<typeof insertInventoryForm>>({
    resolver: zodResolver(insertInventoryForm),
  });
  return (
    <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(async (data) => {
            setIsLoading(true);
            try {
              if (!image) {
                throw new Error("Please upload image.");
              }
              const s3ImageUri = await s3Upload(image);
              if (s3ImageUri) {
                toast.toast({ title: "Image upload successfully." });
              }
              const res = await createInventory.mutateAsync({
                ...data,
                inventoryImageUri: s3ImageUri,
              });
              if (!res) {
                await deleteS3Image(s3ImageUri);
              }
              toast.toast({ title: "Inventory created successfully." });
              router.push("/inventories");
              router.refresh();
              setIsLoading(false);
            } catch (err) {
              console.log(err);
              toast.toast({
                title: "Operation Failed",
                description:
                  (err as Error).message ?? "Check console for errors",
              });
              setIsLoading(false);
            }
          })}
        >
          <div className="flex items-center gap-4">
            <Link href={`/inventories`}>
              <Button variant="outline" size="icon" className="h-7 w-7">
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
              </Button>
            </Link>
            <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
              Create New Ad Inventory
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
                          <Input
                            type="text"
                            className="w-full"
                            {...field}
                            placeholder="Superteam"
                          />
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
                            value={
                              field.value ?? "Description about your website"
                            }
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
                            placeholder="https://superteam.fun"
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
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                            />
                          </svg>
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
