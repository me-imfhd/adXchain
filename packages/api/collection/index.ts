import { verifyCreatorV1 } from "@metaplex-foundation/mpl-token-metadata";
import { umi } from "../lib/utils";
import { Pda, PublicKey, Signer } from "@metaplex-foundation/umi";

interface VerifyCreator {
  metadataAddress: PublicKey | Pda;
  creator: Signer;
}
export async function verifyCreator({
  metadataAddress,
  creator,
}: VerifyCreator) {
  const response = await verifyCreatorV1(umi, {
    metadata: metadataAddress,
    authority: creator,
  }).sendAndConfirm(umi);
  if (response.result.value.err) {
    throw new Error(
      (response.result.value.err as Error).message ??
        "Error occured while verify creator"
    );
  }
  return {
    sign: response.signature,
  };
}
