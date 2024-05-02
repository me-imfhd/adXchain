import { getAd } from "@repo/api";
import { api } from "@repo/trpc";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params: { slot } }: { params: { slot: string } }
) {
  try {
    let underdogApiEndpoint = "https://devnet.underdogprotocol.com";

    const response = await getAd(slot, underdogApiEndpoint);
    if(!response){
      return new Response("Invalid Copied Address.");
    }
    return new Response(JSON.stringify(response), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error((error as Error).message);
    return new Response((error as Error).message, { status: 500 });
  }
}
