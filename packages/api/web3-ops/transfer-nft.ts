import { transferV1 } from "@metaplex-foundation/mpl-core";
import { Pda, PublicKey } from "@metaplex-foundation/umi";
import { UmiInstance } from ".";
import { base58 } from "@metaplex-foundation/umi/serializers";

interface TransferNftProps extends UmiInstance {
  assetAddress: PublicKey | Pda;
  newOwnerPublicKey: PublicKey | Pda;
  collection: PublicKey | Pda;
}
export async function transferNft({
  assetAddress,
  newOwnerPublicKey,
  umi,
  collection,
}: TransferNftProps) {
  const response = await transferV1(umi, {
    asset: assetAddress,
    newOwner: newOwnerPublicKey,
    collection,
  }).sendAndConfirm(umi);
  const signature = base58.deserialize(response.signature)[0];
  if (response.result.value.err) {
    throw new Error(
      (response.result.value.err as Error).message ??
        `Error occured while transfering the NFT txn sign: ${signature}`
    );
  }

  return {
    sign: signature,
  };
}
