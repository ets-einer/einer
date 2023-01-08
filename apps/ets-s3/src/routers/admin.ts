import { AuthMiddleware } from "../auth";
import { Router } from "express";
import { prisma } from "../util";
import { UserRoles } from 'utils';

const router = Router();

router.get('/admin/files', AuthMiddleware, async (req, res) => {
    if (req.user?.roleName !== UserRoles.Admin) {
        return res.status(401).json({ err: 'UNAUTHORIZED' });
    }

    const files = await prisma.file.findMany();

    return res.status(200).json({ files });
})

const adminRouter = { router };

export default adminRouter;