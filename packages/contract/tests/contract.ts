import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Contract } from "../target/types/contract";

describe("contract", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const ids = [1, 2, 3, 4, 5, 6, 7];
  const program = anchor.workspace.Contract as Program<Contract>;
  const wallet = anchor.AnchorProvider.local().wallet;
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
        systemProgram: anchor.web3.SystemProgram.programId,
        user: userPda,
      })
      .rpc();
    console.log("Your transaction signature", tx);
    console.log(await program.account.userAccount.fetch(userPda));
  });
  it("Is Inventory Initialized", async () => {
    const user = await program.account.userAccount.fetch(userPda);
    const [inventoryPda] = anchor.web3.PublicKey.findProgramAddressSync(
      [
        Buffer.from("inventory"),
        wallet.publicKey.toBuffer(),
        Uint8Array.from([user.lastInventory]),
      ],
      program.programId
    );
    console.log("Inventory PDA", inventoryPda.toBase58());
    const tx = await program.methods
      .initializeInventory(mint.publicKey)
      .accounts({
        authority: wallet.publicKey,
        inventory: inventoryPda,
        systemProgram: anchor.web3.SystemProgram.programId,
        user: userPda,
      })
      .rpc();
    console.log("Your transaction signature", tx);
    console.log(await program.account.inventoryAccount.fetch(inventoryPda));
  });
  it("Is Ad NFT Initialized", async () => {
    const user = await program.account.userAccount.fetch(userPda);
    const [inventoryPda] = anchor.web3.PublicKey.findProgramAddressSync(
      [
        Buffer.from("inventory"),
        wallet.publicKey.toBuffer(),
        Uint8Array.from([user.lastInventory - 1]),
      ],
      program.programId
    );
    console.log("Inventory PDA", inventoryPda.toBase58());
    const inventory = await program.account.inventoryAccount.fetch(
      inventoryPda
    );
    const [adNFTPda] = anchor.web3.PublicKey.findProgramAddressSync(
      [
        Buffer.from("nft"),
        inventoryPda.toBuffer(),
        Uint8Array.from([inventory.lastAdNft]),
      ],
      program.programId
    );
    console.log(adNFTPda.toBase58());
    const tx = await program.methods
      .initializeAdNft(adNFTMint.publicKey)
      .accounts({
        authority: wallet.publicKey,
        user: userPda,
        inventory: inventoryPda,
        adNft: adNFTPda,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc();
    console.log(program.account.adNftAccount.fetch(adNFTPda));

    console.log("Your transaction signature", tx);
  });
});
