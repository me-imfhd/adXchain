import { burnV1 } from "@metaplex-foundation/mpl-core";
import { umi } from "../lib/utils";
import { PublicKey } from "@metaplex-foundation/umi";

interface BurnNftOfCollectionProps {
  assetAddress: PublicKey;
  collectionAddress: PublicKey;
}
export async function BurnNft({
  assetAddress,
  collectionAddress,
}: BurnNftOfCollectionProps) {
  const response = await burnV1(umi, {
    asset: assetAddress,
    collection: collectionAddress,
  }).sendAndConfirm(umi);

  if (response.result.value.err) {
    throw new Error(
      (response.result.value.err as Error).message ??
        `Error occured while burning the NFT, txn sign: ${response.signature.toString()}`
    );
  }
  return {
    sign: response.signature,
  };
}
