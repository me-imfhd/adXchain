import { Contract, IDL, NodeWallet, anchor } from "@repo/contract";
import { AnchorWallet } from "@solana/wallet-adapter-react";
import { Connection } from "@solana/web3.js";

type Network = "devnet" | "mainnet" | "testnet" | "localnet";

export class WalletProgram {
  private static nodeWalletInstances: Map<Network, WalletProgram> = new Map();
  private static anchorWalletInstances: Map<Network, WalletProgram> = new Map();
  private static programs: Map<Network, anchor.Program<Contract>> = new Map();
  private static connections: Map<Network, Connection> = new Map();
  private static NodeWallet: NodeWallet = new NodeWallet(
    new anchor.web3.Keypair()
  );
  private constructor(
    private network: Network,
    private wallet: "NodeWallet" | AnchorWallet
  ) {
    const connection = new Connection(this.getConnectionUrl());
    WalletProgram.connections.set(this.network, connection);

    if (this.wallet === "NodeWallet") {
      const provider = new anchor.AnchorProvider(
        connection,
        WalletProgram.NodeWallet
      );
      anchor.setProvider(provider);
      const program = new anchor.Program(IDL as unknown as Contract, provider);
      WalletProgram.programs.set(this.network, program);
      return;
    } else {
      const provider = new anchor.AnchorProvider(connection, this.wallet);
      anchor.setProvider(provider);
      const program = new anchor.Program(IDL as unknown as Contract, provider);
      WalletProgram.programs.set(this.network, program);
    }
  }

  private getConnectionUrl(): string {
    switch (this.network) {
      case "devnet":
        return "https://api.devnet.solana.com/";
      case "mainnet":
        return "https://api.mainnet-beta.solana.com/";
      case "testnet":
        return "https://api.testnet.solana.com/";
      case "localnet":
        return "http://localhost:8899/";
      default:
        throw new Error(`Unsupported network: ${this.network}`);
    }
  }

  public static getProgram(
    network: Network,
    wallet: "NodeWallet" | AnchorWallet
  ) {
    let instancesMap: Map<Network, WalletProgram>;
    if (wallet == "NodeWallet") {
      instancesMap = WalletProgram.nodeWalletInstances;
    } else {
      instancesMap = WalletProgram.anchorWalletInstances;
    }

    if (!instancesMap.has(network)) {
      instancesMap.set(network, new WalletProgram(network, wallet));
    }
    return {
      program: WalletProgram.programs.get(network) as anchor.Program<Contract>,
      connection: WalletProgram.connections.get(network),
    };
  }
}
