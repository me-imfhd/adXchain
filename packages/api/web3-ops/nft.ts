import { KeypairSigner, PublicKey } from "@metaplex-foundation/umi";
import { umi } from "../lib/utils";
import {
  Creator,
  createV1,
  pluginAuthorityPair,
  ruleSet,
} from "@metaplex-foundation/mpl-core";

// const mint = generateSigner(umi);
interface CreateNFTProps {
  assetSigner: KeypairSigner;
  royalityCreatorsAndShares: Creator[];
  royalityBasisPoints: number;
  name: string;
  uri: string;
  collectionAddress: PublicKey;
}
export async function createNFTForCollection({
  assetSigner,
  name,
  uri,
  collectionAddress,
  royalityBasisPoints,
  royalityCreatorsAndShares,
}: CreateNFTProps) {
  let plugins = [
    pluginAuthorityPair({
      type: "Royalties",
      data: {
        basisPoints: royalityBasisPoints,
        creators: royalityCreatorsAndShares,
        ruleSet: ruleSet("None"), // Compatibility rule set
      },
    }),
  ];
  if (royalityCreatorsAndShares.length == 0) {
    plugins = [];
  }
  const response = await createV1(umi, {
    asset: assetSigner,
    name,
    uri,
    plugins,
    collection: collectionAddress,
  }).sendAndConfirm(umi);
  if (response.result.value.err) {
    throw new Error(
      (response.result.value.err as Error).message ??
        `Error occured while creating the NFT, txn sign: ${response.signature.toString()}`
    );
  }
  return {
    sign: response.signature,
  };
}
