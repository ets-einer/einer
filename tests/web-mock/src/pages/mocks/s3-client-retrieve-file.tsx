import { useState } from "react";
import S3Client, { FileFromS3 } from "ets-s3-sdk";
import Base from "../../layout/Base";

const URL = import.meta.env.VITE_SERVICE_S3_URL;

const s3 = new S3Client({
    url: import.meta.env.VITE_SERVICE_S3_URL || "http://localhost:5001/",
});

type MyMetaType = {
    dono: string
}

function S3ClientMock() {
    const [fileId, setFileId] = useState<string>('');
    const [file, setFile] = useState<{ file: FileFromS3<MyMetaType>, downloadUrl: string }>();

    const retrieve = async () => {
        const res = await s3.file.retrieve<MyMetaType>(fileId);

        if (res.ok) {
            setFile(res.data);
        } else {
            alert("ERROR " + res.err);
            console.error(res.err)
        }
    };

    return (
        <Base>
            <div className="bg-indigo-900 flex flex-col justify-center items-center h-screen text-white gap-3 text-xl">
                <h1 className="text-white text-2xl">Write an file ID to be retrieved.</h1>
                <input type="text" className="text-black" onChange={(e) => setFileId(e.target.value)} value={fileId} />
                <br />
                <h1 className="text-white text-xl">File data:</h1>
                <h2 className="text-white font-bold text-center mx-40">{JSON.stringify(file)}</h2>
                <br />
                <button onClick={retrieve} className="border-2 border-white rounded-lg p-2 hover:bg-white hover:text-indigo-900 transition-all">Retrieve</button>
            </div>
        </Base>
    );
}

export default S3ClientMock;