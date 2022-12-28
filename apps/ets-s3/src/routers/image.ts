import { Router } from "express";
import sharp from "sharp";
import { upload, prisma } from "../util";
import process from "process";
import path from "path";

const router = Router();

type ImageUploadOptions = {
  quality?: number;
  meta?: any;
};

type ParseMetaOk = { ok: true; meta: string };

type ParseMetaErr = { ok: false; err: any };

type ParseMetaResult = ParseMetaOk | ParseMetaErr;

function validateOptions(options: ImageUploadOptions) {
  if (options.quality) {
    if (options.quality > 100 || options.quality < 10) {
      return {
        status: 400,
        err: "Quality needs to be in a range between 100 an 10.",
      };
    }
  }

  return null;
}

function validateAndParseMeta(meta: any): ParseMetaResult {
  try {
    const result: ParseMetaOk = { ok: true, meta: JSON.parse(meta) };
    return result;
  } catch (err) {
    const result: ParseMetaErr = { ok: false, err };
    return result;
  }
}

router.post("/upload/image", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ err: "No file sent" });
  }

  const options: ImageUploadOptions = req.body;

  const error = validateOptions(options);

  if (error) return res.status(error.status).json({ err: error.err });

  let meta: string | null = null;
  if (options.meta) {
    const result = validateAndParseMeta(options.meta);
    if (result.ok) {
      meta = result.meta;
    } else {
      return res.status(400).json({ err: result.err });
    }
  }

  const { buffer, originalname } = req.file;
  const timestamp = Date.now();
  const ref = `${timestamp}-${originalname.split(".")[0]}.webp`;

  await sharp(buffer)
    .webp({ quality: options.quality || 40 })
    .toFile(path.resolve(process.cwd() + "/public/images/" + ref));

  const imgPath = `/images/${ref}`;

  const file = await prisma.file.create({
    data: {
      type: "image",
      path: imgPath,
      meta,
    },
  });

  return res.status(200).json({ file });
});

const imageRouter = { router };

export default imageRouter;
