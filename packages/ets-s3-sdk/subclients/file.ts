import { AxiosError } from 'axios';
import { FileFromS3 } from './image';
import axios from 'axios';

type UploadFileParams = {
    file: File;
    meta?: any;
}

type UploadFileOk = {
    ok: true,
    file: FileFromS3
}

type UploadFileErr = {
    ok: false,
    err: AxiosError
}

export class FileClient {
    private uploadUrl: string;

    constructor(url: string) {
        this.uploadUrl = `${url}/upload/file`;
    }

    async upload(opts: UploadFileParams, headers?: any): Promise<UploadFileOk | UploadFileErr> {
        try {
            const res = await axios.postForm(this.uploadUrl, opts, {
              headers, withCredentials: true
            });
    
            return { ok: true, file: res.data.file }
        } catch (err: unknown) {
            return { ok: false, err } as UploadFileErr
        }
      }
}