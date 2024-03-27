import { createGenericFileFromBrowserFile } from "@metaplex-foundation/umi";
import { UmiInstance } from ".";

interface UploadMetadataProps extends UmiInstance {
  uploadFile: File;
  name: string;
  customData: {};
}
export async function uploadMetadata({
  uploadFile,
  name,
  customData,
  umi,
}: UploadMetadataProps) {
  const genericFile = await createGenericFileFromBrowserFile(uploadFile);
  const [image] = await umi.uploader.upload([genericFile]);
  const uri = await umi.uploader.uploadJson({
    name,
    image,
    ...customData,
  });
  const amount = await umi.uploader.getUploadPrice([genericFile]);
  return {
    uri,
    amount,
  };
}
