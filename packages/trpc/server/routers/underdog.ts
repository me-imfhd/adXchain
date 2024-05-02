import { createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod";
import {
  createCollectionUnderdog,
  createUnderdogNFT,
  updateUnderdogNFT,
  updateUnderdogProject,
} from "@repo/api";

const AdNFTAttributesSchema = z.object({
  displayUri: z.string(),
  fileType: z.string(),
  length: z.number(),
  width: z.number(),
  platform: z.union([
    z.literal("web"),
    z.literal("mobile"),
    z.literal("billboard"),
    z.literal("other"),
  ]),
  slotType: z.union([
    z.literal("aside"),
    z.literal("banner"),
    z.literal("popup"),
    z.literal("other"),
  ]),
  status: z.union([z.literal("active"), z.literal("inactive")]),
  websiteUri: z.string(),
});

const NftBodyParamsSchema = z.object({
  name: z.string(),
  description: z.string(),
  image: z.string(),
  delegated: z.boolean(),
  receiverAddress: z.string(),
  attributes: AdNFTAttributesSchema,
});

const createUnderdogNFTSchema = z.object({
  projectId: z.number(),
  underdogApiEndpoint: z.string(),
  nftBody: NftBodyParamsSchema,
});
const UpdateNftBodySchema = z.object({
  name: z.string(),
  description: z.string(),
  image: z.string(),
  attributes: AdNFTAttributesSchema,
});
const updateUnderdogNFTSchema = z.object({
  projectId: z.number(),
  underdogApiEndpoint: z.string(),
  nftId: z.number(),
  nftBody: UpdateNftBodySchema,
});

const createCollectionUnderdogSchema = z.object({
  name: z.string(),
  image: z.string(),
  description: z.string(),
  listStatus: z.enum(["active", "inactive"]),
  websiteUri: z.string(),
});
const collectionUnderdogNFTBodySchema = z.object({
  name: z.string(),
  image: z.string(),
  description: z.string(),
  attributes: z.object({
    listStatus: z.enum(["active", "inactive"]),
    websiteUri: z.string(),
  }),
});
const updateCollectionUnderdogSchema = z.object({
  underdogApiEndpoint: z.string(),
  projectId: z.number(),
  nftBody: collectionUnderdogNFTBodySchema,
});
export const underdogRouter = createTRPCRouter({
  createUnderdogProject: protectedProcedure
    .input(createCollectionUnderdogSchema)
    .mutation(async ({ input }) => {
      return createCollectionUnderdog(input);
    }),
  updateUnderdogProject: protectedProcedure
    .input(updateCollectionUnderdogSchema)
    .mutation(async ({ input }) => {
      return updateUnderdogProject(input);
    }),
  createUnderdogNFT: protectedProcedure
    .input(createUnderdogNFTSchema)
    .mutation(async ({ input }) => {
      return createUnderdogNFT(input);
    }),

  updateUnderdogNFT: protectedProcedure
    .input(updateUnderdogNFTSchema)
    .mutation(async ({ input }) => {
      return updateUnderdogNFT(input);
    }),
});
