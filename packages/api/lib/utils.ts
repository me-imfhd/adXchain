import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { mplCore } from "@metaplex-foundation/mpl-core";

// Use the RPC endpoint of your choice.
export const umi = createUmi("http://127.0.0.1:8899").use(mplCore());
