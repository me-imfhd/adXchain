"use client";
import useUmi from "@/lib/hooks/use-umi";
import {
  createCollection,
  createNFTForCollection,
  fetchAssestByCollection,
  fetchCollection,
  UpdateDelegatePlug,
} from "@repo/api";
import React, { useState } from "react";

import { PublicKey, generateSigner, publicKey } from "@repo/api/lib/umi";
import { Button } from "@repo/ui/components";
import { useWallet } from "@solana/wallet-adapter-react";

const COLLECTION = publicKey("2y9izbXnf7VPJpp9vbL4g5cqctS3h4aRaBA8QDfzfQvq");
const uri = "https://arweave.net/b56MPdHptYzhLlyjIBB-FM9KO66KYcDEkJFc2qFJSYo";
export default function Page() {
  const umi = useUmi();
  const [collection, setCollection] = useState<PublicKey>(COLLECTION);
  const wallet = useWallet();
  if (!collection) {
    alert("Create a Collection First");
  }
  async function handleClick() {
    const collectionSigner = generateSigner(umi);
    const { sign } = await createCollection({
      umi,
      uri,
      collectionSigner,
      name: "Devil May Cry",
      royalityBasisPoints: 500,
      royalityCreatorsAndShares: [],
    });
    setCollection(collectionSigner.publicKey);
    console.log(collectionSigner.publicKey);
    console.log(sign);
  }

  return (
    <div>
      <Button onClick={() => handleClick()}>Create Collection</Button>
      <Button
        onClick={async () => {
          const res = await fetchCollection({
            address: publicKey(collection),
            umi,
          });
          console.log(res);
        }}
      >
        Log Collection
      </Button>
      <Button
        onClick={async () => {
          const assetSigner = generateSigner(umi);
          const { nftSign } = await createNFTForCollection({
            collectionAddress: collection,
            assetSigner,
            attributeList: [],
            name: "Vergil",
            royalityBasisPoints: 300,
            royalityCreatorsAndShares: [],
            umi,
            uri,
          });
          console.log(nftSign);
        }}
      >
        Create NFT
      </Button>
      <Button
        onClick={async () => {
          const res = await fetchAssestByCollection({ collection, umi });
          console.log(res);
        }}
      >
        Log All NFT
      </Button>
      <Button
        onClick={async () => {
          const { sign } = await UpdateDelegatePlug({
            umi,
            collection,
            assetAddress: publicKey(
              "AmnjRE9ytrPmiRKP6zFPn16qF3XaHL3AjiNnbeQMxxtL"
            ),
            newAuthor: publicKey(
              "3KPDxKq9AfRwC9GTcao1Uw1Q2DwaM2FWCnMSnwkTAaHm"
            ),
          });
          console.log(sign);
        }}
      >
        Enable Update Delegate
      </Button>
    </div>
  );
}
