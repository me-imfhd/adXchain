"use client";
import {
  AnchorWallet,
  useAnchorWallet,
  useConnection,
  useWallet,
} from "@solana/wallet-adapter-react";
import React, { createContext, useContext, useEffect, useMemo } from "react";
import { Contract, IDL, anchor } from "@repo/contract";
import { Connection, PublicKey } from "@solana/web3.js";

export const PROGRAM_KEY = new PublicKey(
  "FtX5sPSgTzSoefKZaeAqBuaYDUWKREUpiDNxFLsScEH2"
);
interface UseAnchorContextType {
  connection: Connection;
  anchorWallet: AnchorWallet | undefined;
  program: anchor.Program<Contract> | undefined;
}

export const UseAnchorProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { connection } = useConnection();
  const anchorWallet = useAnchorWallet();
  const program = useMemo(() => {
    if (anchorWallet) {
      const provider = new anchor.AnchorProvider(
        connection,
        anchorWallet,
        anchor.AnchorProvider.defaultOptions()
      );
      anchor.setProvider(provider);
      return new anchor.Program(IDL, PROGRAM_KEY, provider);
    }
    return;
  }, [connection, anchorWallet]);

  return (
    <anchorContext.Provider
      value={{
        connection,
        anchorWallet,
        program,
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
