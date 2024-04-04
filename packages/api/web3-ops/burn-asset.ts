import { burnV1 } from "@metaplex-foundation/mpl-core";
import { PublicKey, Umi } from "@metaplex-foundation/umi";
import { UmiInstance } from ".";

interface BurnNftOfCollectionProps extends UmiInstance {
  assetAddress: PublicKey;
  collectionAddress: PublicKey;
}
export async function BurnNft({
  assetAddress,
  umi,
  collectionAddress,
}: BurnNftOfCollectionProps) {
  const response = await burnV1(umi, {
    asset: assetAddress,
    collection: collectionAddress,
  }).sendAndConfirm(umi);

  if (response.result.value.err) {
    throw new Error(
      (response.result.value.err as Error).message ??
        `Error occured while burning the NFT, txn sign: ${response.signature.toString()}`,
    );
  }
  return {
    sign: response.signature,
  };
}
