import * as z from "zod";

export const userSchema = z.object({
  id: z.number().int(),
  username: z.string(),
  name: z.string().nullish(),
});
