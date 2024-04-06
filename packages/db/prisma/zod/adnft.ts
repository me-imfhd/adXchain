import * as z from "zod";
import { CompleteProject, relatedProjectSchema } from "./index";

export const adNftSchema = z.object({
  id: z.string(),
  underdogNftId: z.number().int(),
  nftMintAddress: z.string().nullish(),
  nftDisplayUri: z.string(),
  nftRedirectUri: z.string(),
  nftFileType: z.string(),
  projectId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export interface CompleteAdNft extends z.infer<typeof adNftSchema> {
  nftProject?: CompleteProject | null;
}

/**
 * relatedAdNftSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedAdNftSchema: z.ZodSchema<CompleteAdNft> = z.lazy(() =>
  adNftSchema.extend({
    nftProject: relatedProjectSchema.nullish(),
  }),
);
