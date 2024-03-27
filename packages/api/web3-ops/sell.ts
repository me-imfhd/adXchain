import { addPluginV1, createPlugin } from "@metaplex-foundation/mpl-core";
import { umi } from "../lib/utils";
import { Pda, PublicKey } from "@metaplex-foundation/umi";
interface TransferDelegatePlug {
  assetAddress: PublicKey | Pda;
  collectionAddress?: PublicKey;
}
export async function transferDelegatePlug({
  assetAddress,
  collectionAddress,
}: TransferDelegatePlug) {
  const response = await addPluginV1(umi, {
    asset: assetAddress,
    plugin: createPlugin({ type: "TransferDelegate" }),
    collection: collectionAddress,
  }).sendAndConfirm(umi);

  if (response.result.value.err) {
    throw new Error(
      (response.result.value.err as Error).message ??
        `Error occured while delegating the NFT, txn sign: ${response.signature.toString()}`
    );
  }
  return {
    sign: response.signature.toString(),
  };
}

export async function freezeDelegatePlug({
  assetAddress,
  collectionAddress,
}: TransferDelegatePlug) {
  const response = await addPluginV1(umi, {
    asset: assetAddress,
    plugin: createPlugin({ type: "FreezeDelegate", data: { frozen: true } }),
    collection: collectionAddress,
  }).sendAndConfirm(umi);

  if (response.result.value.err) {
    throw new Error(
      (response.result.value.err as Error).message ??
        `Error occured while delegating the NFT, txn sign: ${response.signature.toString()}`
    );
  }
  return {
    sign: response.signature.toString(),
  };
}
