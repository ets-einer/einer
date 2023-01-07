import { AxiosError } from 'axios';
import { FileFromS3 } from './image';
import axios from 'axios';

export function stringifyIfExists(object: any) {
    try {
        return object ? JSON.stringify(object) : null
    } catch (err: unknown) {
        throw new Error('Error JSON.stringifying the metadata attribute before uploading the file.')
    }
}

function ifExists(exists: any, func: Function) {
    if (exists) {
        return func(exists);
    } else {
        return null
    }
}

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

export type RetrieveFileOk<MetaType = any> = {
    ok: true,
    data: {
        file: FileFromS3<MetaType>,
        downloadUrl: string
    }
}

type RetrieveFileErr = {
    ok: false,
    err: AxiosError
}

export class FileClient {
    private uploadUrl: string;
    private retrieveUrl: string;

    constructor(url: string) {
        this.uploadUrl = `${url}/upload/file`;
        this.retrieveUrl = `${url}/retrieve/file/`;
    }

    async upload(opts: UploadFileParams, headers?: any): Promise<UploadFileOk | UploadFileErr> {
        try {
            const res = await axios.postForm(this.uploadUrl, {...opts, meta: stringifyIfExists(opts.meta) }, {
              headers, withCredentials: true
            });
    
            return { ok: true, file: res.data.file }
        } catch (err: unknown) {
            return { ok: false, err } as UploadFileErr
        }
      }

    async retrieve<MetaType = any>(fileId: string, headers?: any): Promise<RetrieveFileOk<MetaType> | RetrieveFileErr> {
        try {
            const res = await axios.get(this.retrieveUrl + fileId, { headers, withCredentials: true });

            try {
                return { ok: true, data: {...res.data, file: {...res.data.file, meta: ifExists(res.data.file.meta, JSON.parse)} } }
            } catch (err: unknown) {
                throw new Error('Error JSON.parseing file metadata that came from the server.');
            }
        } catch (err: unknown) {
            return { ok: false, err } as RetrieveFileErr;
        }
    }
}