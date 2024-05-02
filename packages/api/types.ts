export type ProjectCreationResponse = {
  projectId: number;
  transactionId: string;
  mintAddress: string;
};

export type NftCreationResponse = {
  transactionId: string;
  nftId: number;
  projectId: number;
};

export type NftBodyParams = {
  name: string;
  description: string;
  image: string;
  delegated: boolean;
  receiverAddress: string;
  attributes: AdNFTAttributes;
};
export type UpdateNftBodyParams = {
  name: string;
  description: string;
  image: string;
  attributes: AdNFTAttributes;
};

export type NFTCollection = {
  name: string;
  description: string;
  image: string;
  attributes: {
    listStatus: "active" | "inactive";
    websiteUri: string;
  };
};

type NFTsResponse = {
  results: NFT2[];
  page: number;
  limit: number;
  totalPages: number;
  totalResults: number;
};

type NFT2 = {
  name: string;
  symbol: string;
  description: string;
  image: string;
  animationUrl: string;
  externalUrl: string;
  attributes: AdNFTAttributes;
  transferable: boolean;
  compressed: boolean;
  mintAddress: string;
  ownerAddress: string;
  claimerAddress: string;
  status: string;
};

export type AdNFTAttributes = {
  displayUri: string;
  fileType: string;
  length: number;
  width: number;
  platform: "web" | "mobile" | "billboard" | "other";
  slotType: "aside" | "banner" | "popup" | "other";
  status: "active" | "inactive";
  websiteUri: string;
};

export type UnderdogNFT = {
  projectId: number;
  name: string;
  description: string;
  image: string;
  attributes: AdNFTAttributes;
  ownerAddress: string;
};
