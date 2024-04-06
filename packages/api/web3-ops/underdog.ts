import axios from "axios";
import {
  Ad,
  NftBodyParams,
  NftCreationResponse,
  ProjectCreationResponse,
} from "./types";

interface CreateUnderdogProject {
  underdogApiEndpoint: string;
  underdogApiKey: string;
  inventoryName: string;
  inventoryImageUri: string;
}
export async function createUnderdogProject({
  inventoryImageUri,
  inventoryName,
  underdogApiEndpoint,
  underdogApiKey,
}: CreateUnderdogProject) {
  const createProjectResponse = await axios.post(
    `${underdogApiEndpoint}/v2/projects`,
    {
      name: inventoryName,
      image: inventoryImageUri,
    },
    {
      headers: { Authorization: `Bearer ${underdogApiKey}` },
    },
  );
  return createProjectResponse.data as ProjectCreationResponse;
}

interface CreateUnderdogNFT {
  underdogApiEndpoint: string;
  projectId: number;
  underdogApiKey: string;
  nftBody: NftBodyParams;
}

export async function createUnderdogNFT({
  projectId,
  underdogApiEndpoint,
  underdogApiKey,
  nftBody,
}: CreateUnderdogNFT) {
  const createNftResponse = await axios.post(
    `${underdogApiEndpoint}/v2/projects/${projectId}/nfts`,
    nftBody,
    {
      headers: { Authorization: `Bearer ${underdogApiKey}` },
    },
  );
  return createNftResponse.data as NftCreationResponse;
}
interface CreateUnderdogNFTs {
  underdogApiEndpoint: string;
  projectId: number;
  underdogApiKey: string;
  nftArray: NftBodyParams[];
}
export async function createUnderdogNFTs({
  nftArray,
  projectId,
  underdogApiEndpoint,
  underdogApiKey,
}: CreateUnderdogNFTs) {
  const nftArrayResponse = await Promise.all(
    nftArray.map(async (nft) => {
      const res = await axios.post(
        `${underdogApiEndpoint}/v2/projects/${projectId}/nfts`,
        nft,
        {
          headers: { Authorization: `Bearer ${underdogApiKey}` },
        },
      );
      return res.data as NftCreationResponse;
    }),
  );
  return nftArrayResponse;
}

interface RetrieveNft {
  underdogApiEndpoint: string;
  projectId: number;
  nftId: number;
  underdogApiKey: string;
}

export async function retrieveNft({
  projectId,
  nftId,
  underdogApiEndpoint,
  underdogApiKey,
}: RetrieveNft) {
  let retrieveNft;
  do {
    try {
      retrieveNft = await axios.get(
        `${underdogApiEndpoint}/v2/projects/${projectId}/nfts/${nftId}`,
        {
          headers: { Authorization: `Bearer ${underdogApiKey}` },
        },
      );
      await new Promise((resolve) => setTimeout(resolve, 100));
    } catch (e) {
      console.log("retrying");
    }
  } while (retrieveNft?.data.status !== "confirmed");
  const data = retrieveNft.data;
  return data;
}

interface RetrieveNftByMint {
  underdogApiEndpoint: string;
  mintAddresses: string[];
}

export async function retrieveNftByMint({
  underdogApiEndpoint,
  mintAddresses,
}: RetrieveNftByMint) {
  const ads = await Promise.all(
    mintAddresses.map(async (mint) => {
      const retrieveNft = await axios.get(
        `${underdogApiEndpoint}/v2/nfts/${mint}`,
      );
      const data = retrieveNft.data as Ad;
      return data;
    }),
  );
  return ads;
}
