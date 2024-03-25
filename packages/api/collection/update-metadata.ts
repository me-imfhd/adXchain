import {
  updateV1,
  fetchMetadataFromSeeds,
  DataArgs,
} from "@metaplex-foundation/mpl-token-metadata";
import { umi } from "../lib/utils";
import { Pda, PublicKey } from "@metaplex-foundation/umi";

interface UpdateMetadata {
  mintAddress: PublicKey | Pda;
  data: DataArgs;
}

export async function updateMetadata({ mintAddress, data }: UpdateMetadata) {
  const initialMetadata = await fetchMetadataFromSeeds(umi, {
    mint: mintAddress as PublicKey,
  });
  await updateV1(umi, {
    mint: mintAddress,
    data: {
      ...initialMetadata,
      name: data.name,
      creators: data.creators,
      sellerFeeBasisPoints: data.sellerFeeBasisPoints,
      symbol: data.symbol,
      uri: data.uri,
    },
    isMutable: true,
    // ...
  }).sendAndConfirm(umi);
  return;
}
