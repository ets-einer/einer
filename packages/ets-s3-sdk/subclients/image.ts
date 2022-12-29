import axios, { AxiosError } from "axios";

type FileFromS3 = {
    id: string
    type: string
    path: string
    meta?: string
    createdAt: Date
}

type UploadImageParams = {
  file: File;
  quality?: number;
  meta?: any;
};

type UploadImageOk = {
    ok: true
    file: FileFromS3
}

type UploadImageErr = {
    ok: false
    err: AxiosError
}

export class ImageClient {
  private uploadUrl: string;

  constructor(url: string) {
    this.uploadUrl = `${url}/upload/image`;
  }

  async upload(opts: UploadImageParams, headers?: any): Promise<UploadImageOk | UploadImageErr> {
    try {
        const res = await axios.postForm(this.uploadUrl, opts, {
          headers, withCredentials: true
        });

        return { ok: true, file: res.data.file }
    } catch (err: unknown) {
        return { ok: false, err } as UploadImageErr
    }
  }
}
