import { PublicKey } from "@metaplex-foundation/umi";
import { umi } from "../lib/utils";
import { updateV1 } from "@metaplex-foundation/mpl-core";

interface UpdateAssetProps {
  assetAddress: PublicKey;
  newName: string;
  newUri: string;
}
export async function updateAsset({
  assetAddress,
  newName,
  newUri,
}: UpdateAssetProps) {
  const response = await updateV1(umi, {
    asset: assetAddress,
    newName,
    newUri,
  }).sendAndConfirm(umi);
  if (response.result.value.err) {
    throw new Error(
      (response.result.value.err as Error).message ??
        `Error occured while updating the NFT, txn sign: ${response.signature.toString()}`
    );
  }
  return {
    sign: response.signature,
  };
}

// export async function makeAssetImmutable({
//   assetAddress,
// }: Pick<UpdateAssetProps, "assetAddress">) {
//   const response = await updateV1(umi, {

//   }).sendAndConfirm(umi);
//   if (response.result.value.err) {
//     throw new Error(
//       (response.result.value.err as Error).message ??
//         `Error occured while updating the NFT, txn sign: ${response.signature.toString()}`
//     );
//   }
//   return {
//     sign: response.signature,
//   };
// }
