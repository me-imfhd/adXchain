import { Program } from "@coral-xyz/anchor";
import contract from "./target/idl/contract.json";
import { Contract } from "./target/types/contract";

export * as anchor from "@coral-xyz/anchor";
export * from "./target/types/contract";
export const anchorProgram = anchor.workspace.Contract as Program<Contract>;

export default contract;