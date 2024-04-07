import { checkAuth } from "@repo/auth";
import { api } from "@repo/trpc";
import { db } from "@repo/db";
import React from "react";
import axios from "axios";

export default async function Page() {
  const session = await checkAuth();
  const response = await db.project.findMany({
    where: { userId: session.user.id },
    select: { collectionMintAddress: true },
  });
  const underdogEndpoint = "https://devnet.underdogprotocol.com";
  response.map(async (project) => {
    const undgResponse = await axios.get(
      `${underdogEndpoint}/v2/collections/${project.collectionMintAddress}`,
    );
  });

  return <div>Page</div>;
}
