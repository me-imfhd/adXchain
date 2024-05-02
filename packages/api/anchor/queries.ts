"server-only";
import { anchor } from "@repo/contract";
import axios from "axios";
import { NFTCollection, UnderdogNFT } from "../types";
import { WalletProgram } from "./provider-singleton";

export async function allInventories() {
  const { program } = WalletProgram.getProgram("devnet", "NodeWallet");
  const underdogAPIEndpoint = "https://devnet.underdogprotocol.com";
  const all = await program.account.inventoryAccount.all();
  const collectionData = await Promise.all(
    all.map(async (i) => {
      const mintAddress = i.account.collectionMint.toBase58();
      const response = await axios.get(
        `${underdogAPIEndpoint}/v2/collections/${mintAddress}`
      );
      const adNFTAccounts = await program.account.adNftAccount.all([
        collectionMintFilter(mintAddress),
      ]);
      const allAdNFTData = await Promise.all(
        adNFTAccounts.map(async (nftAccount) => {
          const response = await axios.get(
            `${underdogAPIEndpoint}/v2/nfts/${nftAccount.account.nftMint.toBase58()}`
          );
          const nft = response.data as UnderdogNFT;
          return {
            ...nft,
            ...nftAccount,
          };
        })
      );
      const data = response.data as NFTCollection;
      return {
        ...data,
        ...i,
        adNFTs: allAdNFTData,
      };
    })
  );
  return collectionData;
}

export async function getAllActiveInventories() {
  const allI = await allInventories();

  const activeInventories = allI.filter(
    (i) => i.attributes.listStatus === "active"
  );
  return activeInventories;
}

export async function getWalletsInventory(walletAddress: string) {
  const { program } = WalletProgram.getProgram("devnet", "NodeWallet");
  const underdogAPIEndpoint = "https://devnet.underdogprotocol.com";
  const walletPK = new anchor.web3.PublicKey(walletAddress);
  const all = await program.account.inventoryAccount.all([
    { memcmp: { offset: 8, bytes: walletPK.toBase58() } },
  ]);
  const walletInventories = await Promise.all(
    all.map(async (i) => {
      const mintAddress = i.account.collectionMint.toBase58();
      const response = await axios.get(
        `${underdogAPIEndpoint}/v2/collections/${mintAddress}`
      );
      const data = response.data as NFTCollection;
      const adNFTAccounts = await program.account.adNftAccount.all([
        collectionMintFilter(i.account.collectionMint.toBase58()),
      ]);
      const allAdNFTData = await Promise.all(
        adNFTAccounts.map(async (nftAccount) => {
          const response = await axios.get(
            `${underdogAPIEndpoint}/v2/nfts/${nftAccount.account.nftMint.toBase58()}`
          );
          const nft = response.data as UnderdogNFT;
          return {
            ...nft,
            ...nftAccount,
            priceLamports: Number(nftAccount.account.priceLamports),
          };
        })
      );
      return {
        ...data,
        ...i,
        adNFTs: allAdNFTData,
      };
    })
  );
  return walletInventories;
}
export type GetWalletsInventories = Awaited<
  ReturnType<typeof getWalletsInventory>
>;
export async function getInventory(id: number) {
  const { program } = WalletProgram.getProgram("devnet", "NodeWallet");
  const underdogAPIEndpoint = "https://devnet.underdogprotocol.com";
  const [inventoryPda] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from("inventory"), new anchor.BN(id).toArrayLike(Buffer, "le", 8)],
    program.programId
  );
  const inv = await program.account.inventoryAccount.fetchNullable(
    new anchor.web3.PublicKey(inventoryPda)
  );
  if (!inv) {
    return null;
  }
  const adNFTAccounts = await program.account.adNftAccount.all([
    collectionMintFilter(inv.collectionMint.toBase58()),
  ]);
  const allAdNFTData = await Promise.all(
    adNFTAccounts.map(async (nftAccount) => {
      const response = await axios.get(
        `${underdogAPIEndpoint}/v2/nfts/${nftAccount.account.nftMint.toBase58()}`
      );
      const nft = response.data as UnderdogNFT;

      return {
        ...nft,
        ...nftAccount,
        id: Number(nftAccount.account.id),
        priceLamports: Number(nftAccount.account.priceLamports),
      };
    })
  );
  const collectionData = await axios.get(
    `${underdogAPIEndpoint}/v2/collections/${inv.collectionMint}`
  );
  return {
    data: collectionData.data as NFTCollection,
    ...inv,
    adNFTs: allAdNFTData,
  };
}
export type GetInventory = Awaited<ReturnType<typeof getInventory>>;
export const getAdNFT = async (inventoryId: number, adNFTId: number) => {
  const { program } = WalletProgram.getProgram("devnet", "NodeWallet");
  const [inventoryPda] = anchor.web3.PublicKey.findProgramAddressSync(
    [
      Buffer.from("inventory"),
      new anchor.BN(inventoryId).toArrayLike(Buffer, "le", 8),
    ],
    program.programId
  );
  const [adNFTPda] = anchor.web3.PublicKey.findProgramAddressSync(
    [
      Buffer.from("nft"),
      inventoryPda.toBuffer(),
      new anchor.BN(adNFTId).toArrayLike(Buffer, "le", 8),
    ],
    program.programId
  );
  const underdogAPIEndpoint = "https://devnet.underdogprotocol.com";
  const nftAccount = await program.account.adNftAccount.fetch(adNFTPda);
  const response = await axios.get(
    `${underdogAPIEndpoint}/v2/nfts/${nftAccount.nftMint}`
  );
  const nft = response.data as UnderdogNFT;
  return {
    ...nft,
    account: { ...nftAccount },
    publicKey: adNFTPda,
    id: Number(nftAccount.id),
    priceLamports: Number(nftAccount.priceLamports),
  };
};
export type GetAdNFT = Awaited<ReturnType<typeof getAdNFT>>;

export const rentingAdNFTs = async (renterPk: string) => {
  const underdogAPIEndpoint = "https://devnet.underdogprotocol.com";
  const { program } = WalletProgram.getProgram("devnet", "NodeWallet");
  const adNFTAccounts = await program.account.adNftAccount.all([
    renterFilter(renterPk),
  ]);
  const allAdNFTData = await Promise.all(
    adNFTAccounts.map(async (nftAccount) => {
      const response = await axios.get(
        `${underdogAPIEndpoint}/v2/nfts/${nftAccount.account.nftMint.toBase58()}`
      );
      const nft = response.data as UnderdogNFT;
      const inv = await program.account.inventoryAccount.all([
        inventoryCollectionMintFilter(
          nftAccount.account.collectionMint.toBase58()
        ),
      ]);

      const projectId = inv[0]?.account.id;
      if (!projectId) {
        throw new Error("Collection Mint of Inventory and NFT is Different.");
      }
      return {
        ...nft,
        ...nftAccount,
        projectId: Number(projectId),
        priceLamports: Number(nftAccount.account.priceLamports),
      };
    })
  );
  return allAdNFTData;
};

export const getAd = async (
  nftAccountAddress: string,
  underdogAPIEndpoint: string
) => {
  const { program } = WalletProgram.getProgram("devnet", "NodeWallet");
  const nftAccount = await program.account.adNftAccount.fetchNullable(
    new anchor.web3.PublicKey(nftAccountAddress)
  );
  if (!nftAccount) {
    return null;
  }
  const response = await axios.get(
    `${underdogAPIEndpoint}/v2/nfts/${nftAccount.nftMint.toBase58()}`
  );
  const nft = response.data as UnderdogNFT;
  if (!nftAccount.currentRenter) {
    return {
      ...nft,
      attributes: {
        ...nft.attributes,
        displayUri: nft.image,
      },
    };
  }
  return nft;
};

export const walletFilter = (walletPK: string) => ({
  memcmp: {
    offset: 8, // Discriminator.
    bytes: walletPK,
  },
});

export const collectionMintFilter = (mintPK: string) => ({
  memcmp: {
    offset: 8, // Discriminator.
    bytes: mintPK,
  },
});

export const renterFilter = (renterPK: string) => ({
  memcmp: {
    offset: 8 + 32 + 1, // Discriminator.
    bytes: renterPK,
  },
});

export const inventoryCollectionMintFilter = (renterPK: string) => ({
  memcmp: {
    offset: 8 + 32, // Discriminator.
    bytes: renterPK,
  },
});
