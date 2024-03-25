import {
  Key,
  fetchAssetV1,
  getAssetV1GpaBuilder,
  updateAuthority,
} from "@metaplex-foundation/mpl-core";
import { PublicKey } from "@metaplex-foundation/umi";
import { umi } from "../lib/utils";

export interface FetchAssetProps {
  assetAddress: PublicKey;
}

export async function fetchAssestByAddress({ assetAddress }: FetchAssetProps) {
  const asset = await fetchAssetV1(umi, assetAddress);
  return asset;
}

interface FetchAssesByOwnerProps {
  owner: PublicKey;
}

export async function fetchAssestByOwner({ owner }: FetchAssesByOwnerProps) {
  const assetsByOwner = await getAssetV1GpaBuilder(umi)
    .whereField("key", Key.AssetV1)
    .whereField("owner", owner)
    .getDeserialized();
  return assetsByOwner;
}

interface FetchAssesByCollectionProps {
  collection: PublicKey;
}

export async function fetchAssestByCollection({
  collection,
}: FetchAssesByCollectionProps) {
  const assetsByCollection = await getAssetV1GpaBuilder(umi)
    .whereField("key", Key.AssetV1)
    .whereField("updateAuthority", updateAuthority("Collection", [collection]))
    .getDeserialized();
  return assetsByCollection;
}
