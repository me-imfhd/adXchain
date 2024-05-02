"use client";
import {
  AnchorWallet,
  useAnchorWallet,
  useWallet,
} from "@solana/wallet-adapter-react";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Contract, anchor } from "@repo/contract";
import { WalletProgram } from "@repo/api";
import { Network } from "../utils";
import {
  MessageSignerWalletAdapterProps,
  WalletAdapterProps,
} from "@solana/wallet-adapter-base";

interface UseAnchorContextType {
  anchorWallet: AnchorWallet | undefined;
  program: anchor.Program<Contract> | undefined;
  signMessage: MessageSignerWalletAdapterProps["signMessage"] | undefined;
  sendTransaction: WalletAdapterProps["sendTransaction"];
  connection: anchor.web3.Connection | undefined;
  publicKey: anchor.web3.PublicKey | undefined;
}

export const UseAnchorProvider = ({
  children,
  network,
}: {
  children: React.ReactNode;
  network: Network;
}) => {
  const anchorWallet = useAnchorWallet();
  const { signMessage, sendTransaction } = useWallet();
  const [program, setProgram] = useState<anchor.Program<Contract> | undefined>(
    undefined
  );
  const [conn, setConn] = useState<anchor.web3.Connection | undefined>(
    undefined
  );
  useEffect(() => {
    if (anchorWallet) {
      // Wallet is now available, create or retrieve the program instance
      const { program, connection } = WalletProgram.getProgram(
        network,
        anchorWallet
      );
      setProgram(program);
      setConn(connection);
    }
  }, [anchorWallet]);
  return (
    <anchorContext.Provider
      value={{
        anchorWallet,
        program,
        signMessage,
        sendTransaction,
        connection: conn,
        publicKey: anchorWallet?.publicKey,
      }}
    >
      {children}
    </anchorContext.Provider>
  );
};

export const anchorContext = createContext<UseAnchorContextType>(
  {} as UseAnchorContextType
);

export const useAnchorContext = () => {
  const context = useContext(anchorContext);
  if (context === undefined) {
    throw new Error("use useanchorContext hook within anchorContextProvider");
  }
  return context;
};
