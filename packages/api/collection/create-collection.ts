import {
  KeypairSigner,
  Pda,
  PublicKey,
  Signer,
  percentAmount,
} from "@metaplex-foundation/umi";
import {
  createNft,
  verifyCollectionV1,
} from "@metaplex-foundation/mpl-token-metadata";
import { umi } from "../lib/utils";

// const mint = generateSigner(umi);
interface CreateCollectionNft {
  mint: KeypairSigner;
  name: string;
  uri: string;
  sellerFeeBasisPointsPercentage: number;
}
export async function createCollectionNft({
  mint,
  name,
  sellerFeeBasisPointsPercentage,
  uri,
}: CreateCollectionNft) {
  const response = await createNft(umi, {
    mint,
    name,
    uri,
    sellerFeeBasisPoints: percentAmount(sellerFeeBasisPointsPercentage),
    isCollection: true,
  }).sendAndConfirm(umi);
  if (response.result.value.err) {
    throw new Error(
      (response.result.value.err as Error).message ??
        "Error occured while creating the Collection"
    );
  }
  return {
    sign: response.signature,
  };
  //   const asset = await fetchDigitalAsset(umi, mint.publicKey);
}
interface VerifyCollection {
  metadataAddress: PublicKey | Pda;
  collectionMint: PublicKey | Pda;
  collectionAuthority: Signer;
}
export async function verifyCollection({
  collectionAuthority,
  collectionMint,
  metadataAddress,
}: VerifyCollection) {
  const response = await verifyCollectionV1(umi, {
    metadata: metadataAddress,
    collectionMint,
    authority: collectionAuthority,
  }).sendAndConfirm(umi);

  if (response.result.value.err) {
    throw new Error(
      (response.result.value.err as Error).message ??
        "Error occured while verify collection"
    );
  }
  return {
    sign: response.signature,
  };
}
