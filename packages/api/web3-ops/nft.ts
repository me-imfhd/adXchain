import { KeypairSigner, PublicKey } from "@metaplex-foundation/umi";
import {
  AttributeArgs,
  Creator,
  addPluginV1,
  createPlugin,
  createV1,
  pluginAuthorityPair,
  ruleSet,
} from "@metaplex-foundation/mpl-core";
import { UmiInstance } from ".";
import { base58 } from "@metaplex-foundation/umi/serializers";

// const mint = generateSigner(umi);
interface CreateNFTProps extends UmiInstance {
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
  umi,
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
  const signature = base58.deserialize(response.signature)[0];
  if (response.result.value.err) {
    throw new Error(
      (response.result.value.err as Error).message ??
        `Error occured while creating the NFT, txn sign: ${signature}`
    );
  }
  if (attributeList.length === 0) {
    return {
      nftSign: signature,
    };
  }
  const attAttribute = await addAttribute({
    assestAddress: assetSigner.publicKey,
    attributeList,
    collectionAddress,
    umi,
  });

  return {
    nftSign: response.signature,
    attrSign: attAttribute.sign,
  };
}
interface AddAttributeProps extends UmiInstance {
  assestAddress: PublicKey;
  attributeList: AttributeArgs[];
  collectionAddress: PublicKey;
}
export async function addAttribute({
  assestAddress,
  attributeList,
  collectionAddress,
  umi,
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
