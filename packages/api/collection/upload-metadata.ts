import { createGenericFileFromBrowserFile } from "@metaplex-foundation/umi";
import { umi } from "../lib/utils";

interface UploadMetadataProps {
  uploadFile: File;
  name: string;
  description: string;
  customData: {};
}
export async function uploadMetadata({
  uploadFile,
  name,
  customData,
  description,
}: UploadMetadataProps) {
  const genericFile = await createGenericFileFromBrowserFile(uploadFile);
  const [image] = await umi.uploader.upload([genericFile]);
  const uri = await umi.uploader.uploadJson({
    name,
    description,
    image,
    ...customData,
  });
}
