"server-only";
import { AdNFTAttributes, NftBodyParams } from "../types";
import {
  createUnderdogNFT,
  createUnderdogProject,
  retrieveNft,
  updateUnderdogNFT,
} from "./underdog";

interface CreateCollectionUnderdog {
  image: string;
  name: string;
  description: string;
  listStatus: "active" | "inactive";
  websiteUri: string;
}

export async function createCollectionUnderdog({
  image,
  name,
  description,
  listStatus,
  websiteUri,
}: CreateCollectionUnderdog) {
  const underdogAPIEndpoint = "https://devnet.underdogprotocol.com";

  const underdogProject = await createUnderdogProject({
    image,
    name,
    description,
    listStatus,
    underdogApiEndpoint: underdogAPIEndpoint,
    websiteUri,
  });
  return {
    collectionMint: underdogProject.mintAddress,
    underdogProjectId: underdogProject.projectId,
  };
}
interface UpdateAdNFTProps {
  nftId: number;
  inventoryId: number;
  name: string;
  image: string;
  description: string;
  attributes: AdNFTAttributes;
}
export async function updateAdNFTUnderdog({
  nftId,
  inventoryId,
  name,
  image,
  description,
  attributes,
}: UpdateAdNFTProps) {
  const underdogAPIEndpoint = "https://devnet.underdogprotocol.com";
  const nftBody = {
    image,
    name,
    description,
    attributes,
  } as UpdateAdNFTProps;
  const nft = await updateUnderdogNFT({
    projectId: inventoryId,
    nftId,
    underdogApiEndpoint: underdogAPIEndpoint,
    nftBody,
  });
  return {
    underdogProjectId: nft.projectId,
    underdogNFTId: nft.nftId,
  };
}
