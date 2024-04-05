"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Button,
  Input,
} from "@repo/ui/components";
import NFTDemo from "./NFTDemo";
import { useState } from "react";

const MAX_FILE_SIZE = 1024 * 1024 * 5;
const ACCEPTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/gif",
];
const CreateNFTFormSchema = z.object({
  NFTName: z.string().min(2),
  NFTDescription: z.string().min(2),
  NFTImage: z
    .any()
    .refine((files) => {
      return files?.[0]?.size <= MAX_FILE_SIZE;
    }, `Max image size is 5MB.`)
    .refine(
      (files) => ACCEPTED_IMAGE_MIME_TYPES.includes(files?.[0]?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
  NFTAnimation: z
    .any()
    .refine((files) => {
      return files?.[0]?.size <= MAX_FILE_SIZE;
    }, `Max image size is 5MB.`)
    .refine(
      (files) => ACCEPTED_IMAGE_MIME_TYPES.includes(files?.[0]?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
  NFTWebsite: z.string().url(),
  NFTSymbol: z.string().min(2),
  NFTMutable: z.boolean(),
  NFTCategory: z.string(),
  NFTAttribute: z.map(z.string(), z.string()),
});

type CreateNFTFormValues = z.infer<typeof CreateNFTFormSchema>;

export function CreateNFTForm() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [selectedAnimation, setSelectedIAnimation] = useState<File | null>(
    null
  );

  const form = useForm<CreateNFTFormValues>({
    // resolver: zodResolver(CreateNFTFormSchema), // need to fix here

    defaultValues: {
      NFTName: "",
      NFTDescription: "",
      NFTWebsite: "",
      NFTImage: undefined,
      NFTSymbol: "",
      NFTMutable: false,
      NFTAnimation: undefined,
      NFTCategory: "",
      // NFTAttribute: {},
    },
  });

  function onSubmit(values: CreateNFTFormValues) {
    console.log("is this working");
    console.log(values);
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="NFTName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>NFTName</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormDescription>The name of your NFT.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="NFTDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>NFT Description</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormDescription>
                  The description of your NFT or collection.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="NFTImage"
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
                      setSelectedImage(e.target.files?.[0] || null);
                    }}
                    ref={field.ref}
                  />
                </FormControl>
                <FormDescription>
                  This is your image/placeholder of your NFT. If you are
                  creating an NFT type other than image then this will act as
                  the placeholder image in wallets.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="NFTAnimation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Animation</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    onBlur={field.onBlur}
                    name={field.name}
                    onChange={(e) => {
                      field.onChange(e.target.files);
                      setSelectedIAnimation(e.target.files?.[0] || null);
                    }}
                    ref={field.ref}
                  />
                </FormControl>
                <FormDescription>
                  Animation file can be a video file, an audio file, a 3d glb
                  file, a html file. Please remember to also upload a
                  placeholder image and select the right category of NFT you are
                  creating below so websites know how to display your nft.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="NFTSymbol"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Symbol</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>
                  A shorthand ticker symbol for your NFT.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="NFTWebsite"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Website</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>The website of your NFT.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="NFTCategory"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select a Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Category</SelectLabel>
                        <SelectItem value="image">image</SelectItem>
                        <SelectItem value="video">video</SelectItem>
                        <SelectItem value="HTML">HTML</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription>The category of your NFT.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* <FormField 
          control={form.control}
          name="NFTAttribute"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Attributes</FormLabel>
              <FormControl>
                <Button variant="default">Add Attributes</Button>
                
              </FormControl>
              <FormDescription>Attributes of the NFT.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        /> */}
          <FormField
            control={form.control}
            name="NFTMutable"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mutable</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="checkbox"
                    value={field.value ? "true" : "false"}
                    className="h-10 w-10"
                  />
                </FormControl>
                <FormDescription>If the NFT is mutable or not.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" onClick={(e) => console.log("clicked")}>
            Create NFT
          </Button>
        </form>
      </Form>
      <NFTDemo NFTImage={selectedImage || null} />
    </>
  );
}
