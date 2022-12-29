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
  private DEFAULT_HEADERS = { "Content-Type": "multipart/form-data", "credentials": "include" }
  private uploadUrl: string;

  constructor(url: string) {
    this.uploadUrl = `${url}/upload/image`;
  }

  private getFormData(object: any) {
    const formData = new FormData();
    Object.keys(object).forEach((key) => formData.append(key, object[key]));
    return formData;
  }

  async upload(opts: UploadImageParams, headers?: any): Promise<UploadImageOk | UploadImageErr> {
    const data = this.getFormData(opts);

    try {
        const res = await axios.post(this.uploadUrl, data, {
          headers: { ...this.DEFAULT_HEADERS, ...headers },
        });

        return { ok: true, file: res.data.file }
    } catch (err: unknown) {
        return { ok: false, err } as UploadImageErr
    }
  }
}
