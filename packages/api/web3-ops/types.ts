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
  image: string;
  delegated: boolean;
  receiverAddress: string;
  attributes: {
    displayUri: string;
    fileType: string;
  };
};

// export type NftArrayBodyParams = {
//   name: string;
//   image: string;
//   delegated: boolean;
//   receiverAddress: string;
//   attributes: {
//     displayUri: string;
//     fileType: string;
//   };
//   batch : NftBodyParams[]
// };

export interface Ad {
  mintAddress: string;
  status: string;
  ownerAddress: string;
  claimerAddress: string | null;
  collectionAddress: string;
  delegated: boolean;
  core: boolean;
  uri: string | null;
  name: string;
  image: string;
  attributes: {
    displayUri: string;
    fileType: string;
  };
}
