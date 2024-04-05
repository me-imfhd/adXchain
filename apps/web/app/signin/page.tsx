"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { SigninMessage, getCsrfToken, signIn } from "@repo/auth";
import bs58 from "@repo/auth/bs58";

import { createUserSchema } from "@repo/db";
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
  useToast,
} from "@repo/ui/components";
import { useWallet } from "@solana/wallet-adapter-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { publicKey, connected, signMessage } = useWallet();
  const router = useRouter();
  const walletAddress = publicKey?.toBase58();
  const form = useForm<z.infer<typeof createUserSchema>>({
    resolver: zodResolver(createUserSchema),
    defaultValues: { walletAddress: "" },
  });
  const { toast } = useToast();
  useEffect(() => {
    if (walletAddress) {
      form.setValue("walletAddress", walletAddress);
    }
  }, [walletAddress, form.setValue]);
  return (
    <Form {...form}>
      <form
        className="w-full h-screen flex items-center justify-center px-4"
        onSubmit={form.handleSubmit(async (data) => {
          setIsLoading(true);
          try {
            if (!connected || !data.walletAddress) {
              toast({
                title: "Wallet Not Connected",
                description: "Please Connect Your Wallet First.",
              });
              setIsLoading(false);
              return;
            }
            const csrf = await getCsrfToken();

            const message = new SigninMessage({
              domain: window.location.host,
              publicKey: data.walletAddress,
              statement: `Sign in to adXchain.`,
              nonce: csrf!,
            });

            const d = new TextEncoder().encode(message.prepare());
            const signature = await signMessage!(d);
            const serializedSignature = bs58.encode(signature);
            signIn("credentials", {
              message: JSON.stringify(message),
              redirect: false,
              signature: serializedSignature,
              name: data.name,
              email: data.email,
            });
            router.push("/trade");
            setIsLoading(false);
            return;
          } catch (e) {
            toast({
              title: "Could not Login",
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
            <div className="grid gap-2">
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
            </div>
            <div className="grid gap-2">
              <Label>Wallet Address</Label>
              <FormField
                control={form.control}
                name="walletAddress"
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
