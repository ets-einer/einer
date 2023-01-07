import { Router } from "express";
import sharp from "sharp";
import { upload, prisma } from "../util";
import process from "process";
import path from "path";
import { AuthMiddleware } from "../auth";

const router = Router();

type ImageUploadOptions = {
  quality?: number;
  meta?: any;
};

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

router.post("/upload/image", AuthMiddleware, upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ err: "No file sent" });
  }

  const options: ImageUploadOptions = req.body;

  const error = validateOptions(options);

  if (error) return res.status(error.status).json({ err: error.err });

  let meta: string | null = req.body.meta;

  const { buffer, originalname } = req.file;
  const timestamp = Date.now();
  const ref = `${timestamp}-${originalname.split(".")[0]}.webp`;

  await sharp(buffer)
    .webp({ quality: Number(options.quality) || 40 })
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
