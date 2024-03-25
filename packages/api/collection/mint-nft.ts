import { mintV1, TokenStandard } from "@metaplex-foundation/mpl-token-metadata";
import {
  KeypairSigner,
  Pda,
  PublicKey,
  Signer,
} from "@metaplex-foundation/umi";
import { umi } from "../lib/utils";

interface Mint {
  mint: KeypairSigner;
  authority: Signer;
  tokenOwner: Pda | PublicKey;
}
export async function mint({ mint, authority, tokenOwner }: Mint) {
  const response = await mintV1(umi, {
    mint: mint.publicKey,
    authority,
    amount: 1,
    tokenOwner,
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
  //   const asset = await fetchDigitalAsset(umi, mint.publicKey);
}
