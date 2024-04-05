import { Input } from "@repo/ui/components";
import { Upload } from "@repo/ui/icons";
import React, { ChangeEvent, useState } from "react";

export default function UploadButton({ files, setFiles }: any) {
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  return (
    <button onClick={() => document.getElementById("picture")?.click()}>
      {!uploadFile && <Upload />}
      <Input
        id="picture"
        type="file"
        className="hidden"
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          const currentFiles = files ? [...files] : [];
          if (e.target.files?.[0]) {
            setFiles([...currentFiles, e.target.files[0]]);
            setUploadFile(e.target.files[0]);
          }
        }}
      />
    </button>
  );
}
