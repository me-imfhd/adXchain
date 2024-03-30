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

const CreateNFTFormSchema = z.object({
  NFTName: z.string().min(2),
  NFTDescription: z.string().min(2),
  NFTImage: z.string().url(),
  NFTAnimation: z.string().url(),
  NFTWebsite: z.string().url(),
  NFTSymbol: z.string().min(2),
  NFTMutable: z.boolean(),
  NFTCategory: z.string(),
  NFTAttribute: z.map(z.string(), z.string()),
});

type CreateNFTFormValues = z.infer<typeof CreateNFTFormSchema>;

export function CreateNFTForm() {
  const [NftImage, setNftImage] = useState<string>("");
  const [NftAnimation, setNftAnimation] = useState<string>("");

  const form = useForm<CreateNFTFormValues>({
    // resolver: zodResolver(CreateNFTFormSchema),
    defaultValues: {
      NFTName: "Demo NFT",
      NFTDescription: "Demo Description",
      NFTImage: "",
      NFTWebsite: "",
      NFTSymbol: "DNFT",
      NFTMutable: false,
      NFTAnimation: "",
      NFTCategory: "image",
      // NFTAttribute: {},
    },
  });

  function onSubmit(values: CreateNFTFormValues) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log("is this working");
    console.log(values);
    setNftImage(values.NFTImage);
    setNftAnimation(values.NFTAnimation);
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
                  <Input {...field} type="file" />
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
                  <Input {...field} type="file" />
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
      <NFTDemo
        NFTName={form.watch("NFTName")}
        NFTDescription={form.watch("NFTDescription")}
        NFTImage={NftImage}
        NFTAnimation={NftAnimation}
        NFTWebsite={form.watch("NFTWebsite")}
        NFTSymbol={form.watch("NFTSymbol")}
        NFTMutable={form.watch("NFTMutable")}
        NFTCategory={form.watch("NFTCategory")}
        // NFTAttribute={form.watch("NFTAttribute")}
      />
    </>
  );
}
