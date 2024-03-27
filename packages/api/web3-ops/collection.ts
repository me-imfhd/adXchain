import { KeypairSigner } from "@metaplex-foundation/umi";

import { umi } from "../lib/utils";
import {
  Creator,
  createCollectionV1,
  pluginAuthorityPair,
  ruleSet,
} from "@metaplex-foundation/mpl-core";

// const mint = generateSigner(umi);
interface CreateCollection {
  collectionSigner: KeypairSigner;
  royalityCreatorsAndShares: Creator[];
  royalityBasisPoints: number;
  name: string;
  uri: string;
}
export async function createCollection({
  collectionSigner,
  name,
  uri,
  royalityBasisPoints,
  royalityCreatorsAndShares,
}: CreateCollection) {
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
  const response = await createCollectionV1(umi, {
    collection: collectionSigner,
    name,
    uri,
    plugins,
  }).sendAndConfirm(umi);
  if (response.result.value.err) {
    throw new Error(
      (response.result.value.err as Error).message ??
        `Error occured while creating the Collection txn sign: ${response.signature.toString()}`,
    );
  }
  return {
    sign: response.signature,
  };
}
