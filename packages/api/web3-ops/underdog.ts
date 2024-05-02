"server-only";
import axios from "axios";
import {
  NFTCollection,
  NftBodyParams,
  NftCreationResponse,
  ProjectCreationResponse,
  UpdateNftBodyParams,
} from "../types";

interface CreateUnderdogProject {
  underdogApiEndpoint: string;
  name: string;
  image: string;
  description: string;
  listStatus: string;
  websiteUri: string;
}
const underdogApiKey = process.env.UNDERDOG_API_KEY;
export async function createUnderdogProject({
  underdogApiEndpoint,
  description,
  image,
  name,
  listStatus,
  websiteUri,
}: CreateUnderdogProject) {
  const createProjectResponse = await axios.post(
    `${underdogApiEndpoint}/v2/projects`,
    {
      name,
      image,
      description,
      attributes: {
        listStatus,
        websiteUri,
      },
    },
    {
      headers: { Authorization: `Bearer ${underdogApiKey}` },
    }
  );
  return createProjectResponse.data as ProjectCreationResponse;
}
interface UpdateUnderdogProjectProps {
  underdogApiEndpoint: string;
  projectId: number;
  nftBody: NFTCollection;
}
export async function updateUnderdogProject({
  underdogApiEndpoint,
  projectId,
  nftBody,
}: UpdateUnderdogProjectProps) {
  const createProjectResponse = await axios.put(
    `${underdogApiEndpoint}/v2/projects/${projectId}`,
    {
      ...nftBody,
      sellerFeeBasisPoints: 1000,
    },
    {
      headers: { Authorization: `Bearer ${underdogApiKey}` },
    }
  );
  return createProjectResponse.data as ProjectCreationResponse;
}
interface CreateUnderdogNFT {
  underdogApiEndpoint: string;
  projectId: number;
  nftBody: NftBodyParams;
}

export async function createUnderdogNFT({
  projectId,
  underdogApiEndpoint,
  nftBody,
}: CreateUnderdogNFT) {
  console.log(nftBody);
  const createNftResponse = await axios.post(
    `${underdogApiEndpoint}/v2/projects/${projectId}/nfts`,
    nftBody,
    {
      headers: { Authorization: `Bearer ${underdogApiKey}` },
    }
  );
  const nft = createNftResponse.data as NftCreationResponse;
  const mint = await retrieveNft({
    nftId: nft.nftId,
    projectId,
    underdogApiEndpoint,
  });
  return {
    nftMint: mint.mintAddress,
    underdogProjectId: nft.projectId,
    underdogNFTId: nft.nftId,
  };
}
interface UpdateUnderdogNFT {
  underdogApiEndpoint: string;
  projectId: number;
  nftId: number;
  nftBody: UpdateNftBodyParams;
}
export async function updateUnderdogNFT({
  projectId,
  nftId,
  underdogApiEndpoint,
  nftBody,
}: UpdateUnderdogNFT) {
  console.log(nftBody);
  const updatedNftResponse = await axios.put(
    `${underdogApiEndpoint}/v2/projects/${projectId}/nfts/${nftId}`,
    nftBody,
    {
      headers: { Authorization: `Bearer ${underdogApiKey}` },
    }
  );
  return updatedNftResponse.data as NftCreationResponse;
}

interface RetrieveNft {
  underdogApiEndpoint: string;
  projectId: number;
  nftId: number;
}

export async function retrieveNft({
  projectId,
  nftId,
  underdogApiEndpoint,
}: RetrieveNft) {
  let retrieveNft;
  do {
    try {
      retrieveNft = await axios.get(
        `${underdogApiEndpoint}/v2/projects/${projectId}/nfts/${nftId}`,
        {
          headers: { Authorization: `Bearer ${underdogApiKey}` },
        }
      );
      await new Promise((resolve) => setTimeout(resolve, 100));
    } catch (e) {
      console.log("retrying");
    }
  } while (retrieveNft?.data.status !== "confirmed");
  const data = retrieveNft.data;
  return data;
}

interface TransferNFT {
  underdogApiEndpoint: string;
  projectId: number;
  nftId: number;
  receiverAddress: string;
  underdogApiKey: string;
}

export async function transferUnderdogNFT({
  nftId,
  projectId,
  receiverAddress,
  underdogApiEndpoint,
  underdogApiKey,
}: TransferNFT) {
  await axios.post(
    `${underdogApiEndpoint}/https://devnet.underdogprotocol.com/v2/projects/${projectId}/nfts/${nftId}/transfer`,
    { receiverAddress },
    {
      headers: { Authorization: `Bearer ${underdogApiKey}` },
    }
  );
}
