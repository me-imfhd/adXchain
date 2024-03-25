import { KeypairSigner, percentAmount } from "@metaplex-foundation/umi";
import { createNft } from "@metaplex-foundation/mpl-token-metadata";
import { umi } from "../lib/utils";

// const mint = generateSigner(umi);
interface CreateNFTProps {
  mint: KeypairSigner;
  name: string;
  uri: string;
  sellerFeeBasisPointsPercentage: number;
}
export async function createNFTForCollection({
  mint,
  name,
  sellerFeeBasisPointsPercentage,
  uri,
}: CreateNFTProps) {
  const response = await createNft(umi, {
    mint,
    name,
    uri,
    sellerFeeBasisPoints: percentAmount(sellerFeeBasisPointsPercentage),
  }).sendAndConfirm(umi);
  if (response.result.value.err) {
    throw new Error(
      (response.result.value.err as Error).message ??
        "Error occured while creating the NFT"
    );
  }
  return {
    sign: response.signature,
  };
}
