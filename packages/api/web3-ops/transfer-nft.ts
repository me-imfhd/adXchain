import { transferV1 } from "@metaplex-foundation/mpl-core";
import { umi } from "../lib/utils";
import { Pda, PublicKey } from "@metaplex-foundation/umi";

interface TransferNftProps {
  assetAddress: PublicKey | Pda;
  newOwnerPublicKey: PublicKey | Pda;
}
export async function transferNft({
  assetAddress,
  newOwnerPublicKey,
}: TransferNftProps) {
  const response = await transferV1(umi, {
    asset: assetAddress,
    newOwner: newOwnerPublicKey,
  }).sendAndConfirm(umi);

  if (response.result.value.err) {
    throw new Error(
      (response.result.value.err as Error).message ??
        `Error occured while transfering the NFT txn sign: ${response.signature.toString()}`,
    );
  }
  return {
    sign: response.signature,
  };
}
