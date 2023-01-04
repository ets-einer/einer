import { ImageClient } from './subclients';
import { FileClient } from './subclients/file';

type S3ClientConfig = {
    url: string
}

export class S3Client {
    private s3Url: string;
    public image: ImageClient;
    public file: FileClient;

    constructor(config: S3ClientConfig) {
        this.s3Url = config.url;
        this.image = new ImageClient(this.s3Url);
        this.file = new FileClient(this.s3Url);
    }

}


// function MockFile({ name = 'file.txt', size = 1024, type = 'plain/txt', lastModified = new Date() }) {
//     const blob = new Blob(['a'.repeat(size)], { type });
    
//     //@ts-ignore
//     blob.lastModifiedDate = lastModified;
    
//     return new File([blob], name);
// }

// async function test() {
//     const s3 = new S3Client({ url: "http://localhost:5001" });

//     const fakeImage = MockFile({ name: "zimbas.png", type: "image/png" });

//     const res = await s3.image.upload({ file: fakeImage });

//     if (res.ok) {
//         console.log(res.file.path)
//     } else {
//         console.log(res.err)
//     }
// }

// test();