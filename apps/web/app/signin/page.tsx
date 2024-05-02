"use client";
import { useAnchorContext } from "@/lib/hooks/use-anchor";
import { zodResolver } from "@hookform/resolvers/zod";
import { SigninMessage, getCsrfToken, signIn } from "@repo/auth";
import bs58 from "@repo/auth/bs58";

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
  Label,
} from "@repo/ui/components";
import { useWallet } from "@solana/wallet-adapter-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
});
export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { signMessage } = useWallet();
  const { anchorWallet, program } = useAnchorContext();
  const router = useRouter();
  const walletAddress = anchorWallet?.publicKey?.toBase58();
  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: { id: "", name: "", email: "" },
  });
  useEffect(() => {
    if (walletAddress) {
      form.setValue("id", walletAddress);
    }
  }, [walletAddress, form.setValue]);
  return (
    <Form {...form}>
      <form
        className="w-full h-screen flex items-center justify-center px-4"
        onSubmit={form.handleSubmit(async (data) => {
          setIsLoading(true);
          try {
            if (!data.id) {
              toast("Wallet Not Connected", {
                description: "Please Connect Your Wallet First.",
              });
              setIsLoading(false);
              return;
            }
            if (!anchorWallet || !program || !signMessage) {
              toast("Please Try Again");
              return;
            }
            const csrf = await getCsrfToken();

            const message = new SigninMessage({
              domain: window.location.host,
              publicKey: data.id,
              statement: `Sign in to adXchain. \n\n`,
              nonce: csrf!,
            });

            const d = new TextEncoder().encode(message.prepare());
            const signature = await signMessage(d);
            const serializedSignature = bs58.encode(signature);
            // const alreadyUser = await userAdXchainAccount(data.id);
            // if (!alreadyUser) {
            //   const tx = await program.methods
            //     .initializeUser()
            //     .accounts({
            //       authority: new anchor.web3.PublicKey(data.id),
            //     })
            //     .rpc();
            //   toast("User account created successfully.");
            // }
            const a = await signIn("credentials", {
              message: JSON.stringify(message),
              redirect: false,
              signature: serializedSignature,
              name: "",
              email: "",
            });
            if (a?.ok) {
              router.push("/market");
              toast("Locked In 🔒");
              setIsLoading(false);
            }
            return;
          } catch (e) {
            console.log(e);
            toast("Could Not Login, Please Try Again", {
              description: (e as Error).message ?? "Error Logging In.",
            });
            setIsLoading(false);
          }
        })}
      >
        <Card className="w-full max-w-sm  bg-background rounded-xl">
          <CardHeader>
            <CardTitle className="text-2xl">Credentials</CardTitle>
            <CardDescription>Create your account</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            {/* <div className="grid gap-2">
              <Label htmlFor="name">Business Name</Label>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Business Email</Label>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="m@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div> */}
            <div className="grid gap-2">
              <Label>Wallet Address</Label>
              <FormField
                control={form.control}
                name="id"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input type="text" value={walletAddress} disabled />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" type="submit" isLoading={isLoading}>
              Continue
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
