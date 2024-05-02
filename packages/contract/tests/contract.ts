import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Contract } from "../target/types/contract";

describe("contract", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.Contract as Program<Contract>;
  const wallet = anchor.AnchorProvider.local().wallet;
  const inventory_id = 1;
  const nft_id = 1;
  const mint = new anchor.web3.Keypair();
  const adNFTMint = new anchor.web3.Keypair();
  const [userPda] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from("user"), wallet.publicKey.toBuffer()],
    program.programId
  );
  it("Is User Initialized", async () => {
    const tx = await program.methods
      .initializeUser()
      .accounts({
        authority: wallet.publicKey,
      })
      .rpc();
    console.log("Your transaction signature", tx);
    console.log(await program.account.userAccount.fetch(userPda));
  });
  it("Is Inventory Initialized", async () => {
    const [inventoryPda] = anchor.web3.PublicKey.findProgramAddressSync(
      [
        Buffer.from("inventory"),
        wallet.publicKey.toBuffer(),
        Uint8Array.from([inventory_id]),
      ],
      program.programId
    );
    console.log("Inventory PDA", inventoryPda.toBase58());
    const tx = await program.methods
      .initializeInventory(inventory_id, mint.publicKey)
      .accounts({
        inventory: inventoryPda,
      })
      .rpc();
    console.log("Your transaction signature", tx);
    console.log(await program.account.inventoryAccount.fetch(inventoryPda));
  });
  it("Is Ad NFT Initialized", async () => {
    const [inventoryPda] = anchor.web3.PublicKey.findProgramAddressSync(
      [
        Buffer.from("inventory"),
        wallet.publicKey.toBuffer(),
        Uint8Array.from([inventory_id]),
      ],
      program.programId
    );
    console.log("Inventory PDA", inventoryPda.toBase58());
    const inventory = await program.account.inventoryAccount.fetch(
      inventoryPda
    );
    const [adNFTPda] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from("nft"), inventoryPda.toBuffer(), Uint8Array.from([nft_id])],
      program.programId
    );
    // console.log(adNFTPda.toBase58());
    const tx = await program.methods
      .initializeAdNft(inventory_id, nft_id, adNFTMint.publicKey)
      .accounts({
        inventory: inventoryPda,
        adNft: adNFTPda,
      })
      .rpc();
    console.log(await program.account.adNftAccount.fetch(adNFTPda));

    console.log("Your transaction signature", tx);
    console.log(await program.account.userAccount.all());
    console.log(await program.account.inventoryAccount.all());
    console.log(await program.account.adNftAccount.all());
  });
});
