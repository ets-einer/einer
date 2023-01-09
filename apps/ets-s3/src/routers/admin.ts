import { AuthMiddleware } from "../auth";
import { Router } from "express";
import { prisma } from "../util";
import { UserRoles } from "utils";
import fs from "fs";
import path from "path";

const router = Router();

router.get("/admin/files", AuthMiddleware, async (req, res) => {
  if (req.user?.roleName !== UserRoles.Admin) {
    return res.status(401).json({ err: "UNAUTHORIZED" });
  }

  const files = await prisma.file.findMany();

  return res.status(200).json({ files });
});

router.delete("/admin/file/:id", AuthMiddleware, async (req, res) => {
  if (req.user?.roleName !== UserRoles.Admin) {
    return res.status(401).json({ err: "UNAUTHORIZED" });
  }

  const id = req.params.id;

  try {
    const deletedFile = await prisma.file.delete({
        where: { id },
    });
        
    fs.rmSync(process.cwd() + deletedFile.path, {
        force: false
    });

    return res
      .status(200)
      .json({ message: "File deleted with success", deletedFile });
  } catch (err: any) {
    if (err.code == "ENOENT") {
      return res
        .status(500)
        .json({
          message:
            "Error trying to delete file from system: File already existed in the database (and got deleted), but not on the disk",
          sentId: id,
          err,
        });
    }

    return res
      .status(404)
      .json({ message: "File with given id not found", sentId: id, err });
  }
});

const adminRouter = { router };

export default adminRouter;
