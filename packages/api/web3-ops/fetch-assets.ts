import {
  Key,
  fetchAssetV1,
  fetchCollectionV1,
  getAssetV1GpaBuilder,
  updateAuthority,
} from "@metaplex-foundation/mpl-core";
import { PublicKey } from "@metaplex-foundation/umi";
import { UmiInstance } from ".";

export interface FetchAssetProps extends UmiInstance {
  address: PublicKey;
}

export async function fetchAssestByAddress({ address, umi }: FetchAssetProps) {
  const asset = await fetchAssetV1(umi, address);
  return asset;
}

export async function fetchCollection({ address, umi }: FetchAssetProps) {
  const asset = await fetchCollectionV1(umi, address);
  return asset;
}
interface FetchAssesByOwnerProps extends UmiInstance {
  owner: PublicKey;
}

export async function fetchAssestByOwner({
  owner,
  umi,
}: FetchAssesByOwnerProps) {
  const assetsByOwner = await getAssetV1GpaBuilder(umi)
    .whereField("key", Key.AssetV1)
    .whereField("owner", owner)
    .getDeserialized();
  return assetsByOwner;
}

interface FetchAssesByCollectionProps extends UmiInstance {
  collection: PublicKey;
}

export async function fetchAssestByCollection({
  collection,
  umi,
}: FetchAssesByCollectionProps) {
  const assetsByCollection = await getAssetV1GpaBuilder(umi)
    .whereField("key", Key.AssetV1)
    .whereField("updateAuthority", updateAuthority("Collection", [collection]))
    .getDeserialized();
  return assetsByCollection;
}
