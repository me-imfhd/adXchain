export * as anchor from "@coral-xyz/anchor";
export * from "./target/types/contract";
export { Program } from "@coral-xyz/anchor";
import NodeWallet from "@coral-xyz/anchor/dist/cjs/nodewallet";
import idl from "./target/idl/contract.json";
export const IDL = idl;
export { NodeWallet };
