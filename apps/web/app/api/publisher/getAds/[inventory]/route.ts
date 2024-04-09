import { GetAds } from "@repo/api";
import { api } from "@repo/trpc";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params: { inventory } }: { params: { inventory: string } },
) {
  try {
    const searchParams = await request.nextUrl.searchParams;
    const inventoryId = inventory;
    const network = searchParams.get("network");
    let underdogApiEndpoint;
    if (network === "devnet") {
      underdogApiEndpoint = "https://devnet.underdogprotocol.com";
    } else if (network === "mainnet") {
      //   underdogApiEndpoint = "https://mainnet.underdogprotocol.com";
      return new Response("adxchain is currently on devnet", { status: 400 });
    } else {
      return new Response("Invalid network selection", { status: 400 });
    }
    const response = await api.publisher.getAds.query({
      inventoryId: inventoryId,
      underdogApiEndpoint: underdogApiEndpoint,
    });
    return new Response(JSON.stringify(response), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);
    return new Response("Error occured please retry.", { status: 500 });
  }
}

const endpoint = `http://localhost:3000/api/publisher/getAds/inventory-id?network=devnet`;
type responseType = GetAds;
