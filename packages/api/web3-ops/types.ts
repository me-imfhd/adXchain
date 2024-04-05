export type ProjectCreationResponse = {
  projectId: number;
  transactionId: string;
  mintAddress: string;
};

export type NftCreationResponse = {
  transactionId: string;
  nftId: number;
  projectId: number;
  mintAddress: string;
};

export type NftBodyParams = {
  name: string;
  image: string;
  delegated: boolean;
  receiverAddress: string;
  attributes: {
    displayUri: string;
    fileType: string;
  };
};