import { Router } from "express";
import { AuthMiddleware } from "../auth";
import { prisma, upload } from "../util";
import zlib from "zlib";
import fs from "fs";
import path from "path";
import process from "process";

const router = Router();

const errorMessages = {
  noFileFound: "No file with given Id found",
  noFileSent:
    'No file sent. Expected to receive a formData with a file in the key "file"',
  tryingToDecompressStaticImage:
    "The file you are trying to download its an image that was not compressed. It is being served statically as an optimized .webp.",
} as const;

router.post("/upload/file", AuthMiddleware, upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ err: errorMessages.noFileSent });
  }

  const file = zlib.deflateSync(req.file.buffer);
  const mimeType = req.file.mimetype;

  const filePath = `/public/${Date.now()}-${req.file.originalname}`;

  const dbInstance = await prisma.file.create({
    data: {
      path: filePath,
      type: mimeType,
    },
  });

  fs.writeFileSync(path.join(process.cwd(), filePath), file);

  res.status(201).json({ msg: "ok", file: dbInstance });
});

router.get("/retrieve/file/:id", AuthMiddleware, async (req, res) => {
  const id = req.params.id;

  const file = await prisma.file.findFirst({
    where: {
      id,
    },
  });

  if (!file) {
    return res.status(404).json({ err: errorMessages.noFileFound, sentId: id });
  }

  if (file.type == "image") {
    return res.status(400).json({
      err: errorMessages.tryingToDecompressStaticImage,
      filePath: file.path,
    });
  }

  const filePath = path.join(process.cwd(), file.path);
  const fileBuffer = fs.readFileSync(filePath);

  const [rawFileName] = filePath.split("/").slice(-1);

  const noStampFileName = rawFileName.split('-');

  noStampFileName.shift();

  const fileName = noStampFileName.join('');

  const decompressedFile = zlib.inflateSync(fileBuffer);

  res
    .status(200)
    .set("Content-Type", file.type)
    .set("Content-disposition", "attachment;filename=" + fileName)
    .set("Content-Length", decompressedFile.length.toString())
    .send(decompressedFile);
});

const fileRouter = { router };

export default fileRouter;
