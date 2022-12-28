import { useState } from "react";
import { S3Client } from "ets-s3-sdk";
import Base from "../../layout/Base";

const URL = import.meta.env.VITE_SERVICE_S3_URL;

const s3 = new S3Client({
  url: import.meta.env.VITE_SERVICE_S3_URL || "http://localhost:5001/",
});

function S3ClientMock() {
  const [file, setFile] = useState<File>();

  const upload = async () => {
    if (file) {
      const res = await s3.image.upload({ file });

      if (res.ok) {
        window.open(URL + res.file.path, '_blank')?.focus();
      } else {
        alert("ERROR " + res.err);
      }
    }
  };

  return (
    <Base>
      <div className="bg-indigo-900 flex flex-col justify-center items-center h-screen text-white gap-3 text-xl">
        <input type="file" onChange={(e) => setFile(e.target.files![0])} />
        <br />
        {file?.name} selected.
        <br />
        <button onClick={upload} className="border-2 border-white rounded-lg p-2 hover:bg-white hover:text-indigo-900 transition-all">Upload</button>
      </div>
    </Base>
  );
}

export default S3ClientMock;