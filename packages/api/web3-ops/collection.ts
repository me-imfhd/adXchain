import { KeypairSigner } from "@metaplex-foundation/umi";
import { base58 } from "@metaplex-foundation/umi/serializers";

import {
  Creator,
  createCollectionV1,
  pluginAuthorityPair,
  ruleSet,
} from "@metaplex-foundation/mpl-core";
import { UmiInstance } from ".";

// const mint = generateSigner(umi);
export interface CreateCollectionProps extends UmiInstance {
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
  umi,
  royalityCreatorsAndShares,
}: CreateCollectionProps) {
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
  const signature = base58.deserialize(response.signature)[0];
  if (response.result.value.err) {
    throw new Error(
      (response.result.value.err as Error).message ??
        `Error occured while creating the Collection txn sign: ${signature}`,
    );
  }
  return {
    sign: signature,
  };
}
