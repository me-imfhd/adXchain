"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

const CreateNFTCollectionFormSchema = z.object({
    NFTName: z.string().min(2),
    NFTDescription: z.string().min(2),
    NFTImage: z.string().url(),
    NFTWebsite: z.string().url(),
    NFTSymbol: z.string().min(2),
    NFTMutable: z.boolean(),
})

type CreateNFTCollectionFormValues = z.infer<typeof CreateNFTCollectionFormSchema>

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components"
import { Button, Input } from "@repo/ui/components"


export function CreateNFTCollectionForm() {
  
    const form = useForm<CreateNFTCollectionFormValues>({
        resolver: zodResolver(CreateNFTCollectionFormSchema),
        defaultValues: {
            NFTName: "",
            NFTDescription: "",
            NFTImage: "",
            NFTWebsite: "",
            NFTSymbol: "",
            NFTMutable: false,
        },
      })


      function onSubmit(values: CreateNFTCollectionFormValues) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
      }

  return (
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
              <FormDescription>
                The name of your NFT.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="NFTDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>NFTCollection Description</FormLabel>
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
                <Input {...field} type="file"/>
              </FormControl>
              <FormDescription>
              This is your image/placeholder of your NFT. If you are creating an NFT type other than image then this will act as the placeholder image in wallets.


              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
           <FormField control={form.control} name="NFTSymbol" render={({ field }) => (
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
        <FormField control={form.control} name="NFTWebsite" render={({ field }) => (
            <FormItem>
              <FormLabel>Website</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
              The website of your NFT.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField control={form.control} name="NFTMutable" render={({ field }) => (
                <FormItem>
                    <FormLabel>Mutable</FormLabel>
                    <FormControl>
                        <Input {...field} type="checkbox" value={field.value ? "true" : "false"}  className="h-10 w-10"/>
                    </FormControl>
                    <FormDescription>
                    If the NFT is mutable or not.
                    </FormDescription>
                    <FormMessage />
                </FormItem>
            )}
        />
        <Button type="submit">Create NFT Collection</Button>
      </form>
    </Form>
  )
}
