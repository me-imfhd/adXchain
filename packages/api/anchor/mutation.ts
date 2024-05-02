"server-only";
import { Contract, anchor } from "@repo/contract";

// export async function createUserAccount(
//   walletAddress: string,
//   program: anchor.Program<Contract>
// ) {
//   const authority = new anchor.web3.PublicKey(walletAddress);
//   const tx = await program.methods
//     .initializeUser()
//     .accounts({
//       authority,
//     })
//     .rpc();

//   return {
//     tx,
//   };
// }

export async function createInventoryAccount(
  collectionMintAddress: string,
  walletAddress: string,
  inventoryId: number,
  program: anchor.Program<Contract>
) {
  const collectionMint = new anchor.web3.PublicKey(collectionMintAddress);
  const authority = new anchor.web3.PublicKey(walletAddress);
  const tx = await program.methods
    .initializeInventory(new anchor.BN(inventoryId), collectionMint)
    .accounts({
      authority,
    })
    .rpc();
  // const inventory = await program.account.inventoryAccount.fetch(inventoryPda);

  return {
    tx,
    // inventory,
  };
}

export async function createAdNFTAccount(
  inventoryId: number,
  nftId: number,
  adNFTMintAddress: string,
  program: anchor.Program<Contract>,
  price_lamports: number
) {
  const adNFTMint = new anchor.web3.PublicKey(adNFTMintAddress);

  const tx = await program.methods
    .initializeAdNft(
      new anchor.BN(inventoryId),
      new anchor.BN(nftId),
      adNFTMint,
      new anchor.BN(price_lamports)
    )
    .rpc();
  // const adNFT = await program.account.adNftAccount.fetch(adNFTPda);
  return {
    tx,
    // adNFT,
  };
}

export async function updateAdNFTAccount(
  inventoryId: number,
  nftId: number,
  adNFTMintAddress: string,
  program: anchor.Program<Contract>,
  price_lamports: number
) {
  const adNFTMint = new anchor.web3.PublicKey(adNFTMintAddress);
  const tx = await program.methods
    .updateAdNft(
      new anchor.BN(inventoryId),
      new anchor.BN(nftId),
      adNFTMint,
      new anchor.BN(price_lamports)
    )
    .rpc();
  // const adNFT = await program.account.adNftAccount.fetch(adNFTPda);
  return {
    tx,
    // adNFT,
  };
}

export async function lendAdNFT(
  inventoryId: number,
  nftId: number,
  program: anchor.Program<Contract>,
  transactionAmount: number,
  lenderAddress: string
) {
  const tx = await program.methods
    .lendAdNft(
      new anchor.BN(inventoryId),
      new anchor.BN(nftId),
      new anchor.BN(transactionAmount)
    )
    .accounts({ lender: new anchor.web3.PublicKey(lenderAddress) })
    .transaction();
  return {
    tx,
  };
}
