import { createGenericFileFromBrowserFile } from "@metaplex-foundation/umi";
import { UmiInstance } from ".";

export interface UploadMetadataProps extends UmiInstance {
  uploadFile?: File;
  name: string;
  customData: {};
}
export async function uploadMetadata({
  uploadFile,
  name,
  customData,
  umi,
}: UploadMetadataProps) {
  const genericFile = uploadFile
    ? await createGenericFileFromBrowserFile(uploadFile)
    : null;
  const amount = genericFile
    ? await umi.uploader.getUploadPrice([genericFile])
    : 0;
  const [image] = genericFile
    ? await umi.uploader.upload([genericFile])
    : [null];

  const uploadData = {
    name,
    ...customData,
    ...(image ? { image } : {}),
  };

  const uri = await umi.uploader.uploadJson(uploadData);

  return {
    uri,
    ...(amount ? { amount } : {}),
  };
}
