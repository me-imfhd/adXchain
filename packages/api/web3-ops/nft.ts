import { KeypairSigner, PublicKey } from "@metaplex-foundation/umi";
import { umi } from "../lib/utils";
import {
  AttributeArgs,
  Creator,
  addPluginV1,
  createPlugin,
  createV1,
  pluginAuthorityPair,
  ruleSet,
} from "@metaplex-foundation/mpl-core";

// const mint = generateSigner(umi);
interface CreateNFTProps {
  assetSigner: KeypairSigner;
  royalityCreatorsAndShares: Creator[];
  attributeList: AttributeArgs[];
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
  attributeList,
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
  const attAttribute = await addAttribute({
    assestAddress: assetSigner.publicKey,
    attributeList,
    collectionAddress,
  });

  return {
    nftSign: response.signature,
    attrSign: attAttribute.sign,
  };
}
interface AddAttributeProps {
  assestAddress: PublicKey;
  attributeList: AttributeArgs[];
  collectionAddress: PublicKey;
}
export async function addAttribute({
  assestAddress,
  attributeList,
  collectionAddress,
}: AddAttributeProps) {
  const attributePlugin = createPlugin({
    type: "Attributes",
    data: {
      attributeList,
    },
  });
  const attPluginResponse = await addPluginV1(umi, {
    asset: assestAddress,
    plugin: attributePlugin,
    collection: collectionAddress,
  }).sendAndConfirm(umi);

  if (attPluginResponse.result.value.err) {
    throw new Error(
      (attPluginResponse.result.value.err as Error).message ??
        `Error occured while creating the NFT, txn sign: ${attPluginResponse.signature.toString()}`
    );
  }

  return {
    sign: attPluginResponse.signature,
  };
}
