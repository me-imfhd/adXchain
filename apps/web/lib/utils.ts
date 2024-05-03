"use server";
// import { isClerkAPIResponseError } from "@clerk/nextjs";
import { cookies } from "next/headers";
import { toast } from "sonner";
import { z } from "zod";

export type Network = "devnet" | "mainnet";
export function getNetworkCookie(): Network {
  const network = cookies().get("network")?.value;
  if (!network) {
    cookies().set("network", "devnet");
  }
  return cookies().get("network")?.value as Network;
}

export function slugify(str: string) {
  return str
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");
}

export function unslugify(str: string) {
  return str.replace(/-/g, " ");
}

export function toTitleCase(str: string) {
  return str.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase()
  );
}

export function toSentenceCase(str: string) {
  return str
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase());
}

export function truncate(str: string, length: number) {
  return str.length > length ? `${str.substring(0, length)}...` : str;
}

export function isArrayOfFile(files: unknown): files is File[] {
  const isArray = Array.isArray(files);
  if (!isArray) return false;
  return files.every((file) => file instanceof File);
}

// export function absoluteUrl(path: string) {
//   return `${process.env.NEXT_PUBLIC_APP_URL}${path}`;
// }

export function catchError(err: unknown) {
  console.log(err);
  if (err instanceof z.ZodError) {
    const errors = err.issues.map((issue) => {
      return issue.message;
    });
    return toast(errors.join("\n"));
  } else if (err instanceof Error) {
    return toast(err.message);
  } else {
    return toast("Something went wrong, please try again later.");
  }
}

export function isMacOs() {
  return window.navigator.userAgent.includes("Mac");
}
