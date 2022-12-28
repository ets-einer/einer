import { useState } from "react";
import "./App.css";
import { S3Client } from "ets-s3-sdk";

const s3 = new S3Client({
  url: import.meta.env.VITE_SERVICE_S3_URL || "http://localhost:5001",
});

function App() {
  const [file, setFile] = useState<File>();

  const upload = async () => {
    if (file) {
      const res = await s3.image.upload({ file });

      if (res.ok) {
        alert("UPLOADED AT " + res.file.path);
      } else {
        alert("ERROR " + res.err);
      }
    }
  };

  return (
    <div className="App">
      <input type="file" onChange={(e) => setFile(e.target.files![0])} />
      <br />
      {file?.name} selected.
      <br />
      <button onClick={upload}>Upload</button>
    </div>
  );
}

export default App;
