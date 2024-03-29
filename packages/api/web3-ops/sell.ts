import {
  PluginType,
  addPluginV1,
  addressPluginAuthority,
  createPlugin,
  revokePluginAuthorityV1,
} from "@metaplex-foundation/mpl-core";
import { Pda, PublicKey } from "@metaplex-foundation/umi";
import { UmiInstance } from ".";
import { base58 } from "@metaplex-foundation/umi/serializers";
interface TransferDelegatePlug extends UmiInstance {
  assetAddress: PublicKey;
  collection: PublicKey;
  newAuthor: PublicKey
}
export async function UpdateDelegatePlug({
  assetAddress,
  collection,
  umi,
  newAuthor,
}: TransferDelegatePlug) {
  const response = await addPluginV1(umi, {
    asset: assetAddress,
    plugin: createPlugin({ type: "UpdateDelegate" }),
    collection: collection,
    initAuthority: addressPluginAuthority(newAuthor)
  }).sendAndConfirm(umi);
  const signature = base58.deserialize(response.signature)[0];
  if (response.result.value.err) {
    throw new Error(
      (response.result.value.err as Error).message ??
        `Error occured while delegating the NFT, txn sign: ${signature}`
    );
  }
  return {
    sign: signature,
  };
}

export async function revokeUpdatePlug({
  assetAddress,
  collection,
  umi,
}: TransferDelegatePlug) {
  const response = await revokePluginAuthorityV1(umi, {
    pluginType: PluginType.UpdateDelegate,
    asset: assetAddress,
    collection,
  }).sendAndConfirm(umi);
  const signature = base58.deserialize(response.signature)[0];

  if (response.result.value.err) {
    throw new Error(
      (response.result.value.err as Error).message ??
        `Error occured while revoking the update delegate plug, txn sign: ${signature}`
    );
  }
  return {
    sign: signature,
  };
}
