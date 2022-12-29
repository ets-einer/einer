import { NextFunction, Request, Response } from "express";
import axios from 'axios';
import { logger } from "./logger";

const authUrl = `${process.env.VITE_SERVICE_AUTH_URL}/ms/me`;

export const AuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        logger.log(JSON.stringify(req.cookies))
        const res = await axios.post(authUrl, { sessionId: req.cookies.sessionId });

        req.user = res.data.user;
        next();
    } catch (err) {
        return res.status(401).json({ msg: 'UNAUTHORIZED', err }).end();
    }
}