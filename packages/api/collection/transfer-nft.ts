import {
  TokenStandard,
  transferV1,
} from "@metaplex-foundation/mpl-token-metadata";
import { umi } from "../lib/utils";
import { Pda, PublicKey, Signer } from "@metaplex-foundation/umi";

interface TransferNftProps {
  mint: PublicKey | Pda;
  currentOwner: Signer;
  newOwnerPublicKey: PublicKey | Pda;
}
export async function transferNft({
  currentOwner,
  mint,
  newOwnerPublicKey,
}: TransferNftProps) {
  const response = await transferV1(umi, {
    mint,
    authority: currentOwner,
    tokenOwner: currentOwner.publicKey,
    destinationOwner: newOwnerPublicKey,
    tokenStandard: TokenStandard.NonFungible,
  }).sendAndConfirm(umi);

  if (response.result.value.err) {
    throw new Error(
      (response.result.value.err as Error).message ??
        "Error occured while minting the NFT"
    );
  }
  return {
    sign: response.signature,
  };
}
