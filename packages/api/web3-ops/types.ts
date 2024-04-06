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