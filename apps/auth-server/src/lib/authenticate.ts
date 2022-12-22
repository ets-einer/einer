import { logger } from "../logger";
import type { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { prisma } from "./prisma";
import { redis } from "./redis";

export const authenticateMicroserviceCall = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let sessionCookie = undefined;

  try {
    sessionCookie = z
      .object({
        sessionId: z.string(),
      })
      .parse(req.body);
  } catch (error) {
    return res.status(400).json({ message: "Session not found", error });
  }

  const { sessionId } = sessionCookie;

  logger.log(sessionId);

  try {
    const userId = await redis.get(sessionId);

    if (!userId)
      return res
        .status(404)
        .json({ message: "User identifier from your session does not exists" });

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    req.user = user;
    res.locals.user = user;
    next();
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Could not retrieve user from session" });
  }
};

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let sessionCookie = undefined;

  try {
    sessionCookie = z
      .object({
        sessionId: z.string(),
      })
      .parse(req.cookies);
  } catch (error) {
    return res.status(400).json({ message: "Session not found", error });
  }

  const { sessionId } = sessionCookie;

  logger.log(sessionId);

  try {
    const userId = await redis.get(sessionId);

    if (!userId)
      return res
        .status(404)
        .json({ message: "User identifier from your session does not exists" });

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    req.user = user;
    res.locals.user = user;
    next();
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Could not retrieve user from session" });
  }
};
