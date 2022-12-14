import { Router } from "express";
import { z } from "zod";
import { prisma } from "./lib/prisma";
import crypto from "crypto";
import { redis } from "@src/lib/redis";
import { authenticate, authenticateMicroserviceCall } from "./lib/middleware";
import type { Request, Response } from "express";
import bcrypt from 'bcrypt'
import { User } from "@prisma/client";
import { exclude } from "./lib/util";

const router = Router();

const SALT_ROUNDS = 10;

router.get("/me", [authenticate], (req: Request, res: Response) => {
  return res
    .status(200)
    .json({
      message: "User retrieved successfully",
      user: exclude(req.user as User, ["passwordHash"]),
    });
});

router.post(
  "/ms/me",
  [authenticateMicroserviceCall],
  (req: Request, res: Response) => {
    return res
      .status(200)
      .json({
        message: "User retrieved successfully",
        user: exclude(req.user as User, ["passwordHash"]),
      });
  }
);

router.post("/signout", async (req: Request, res: Response) => {
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

  res.clearCookie(sessionId);

  try {
    await redis.del(sessionId);
    return res.status(200).json({ message: "Sign out succesfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Could not delete session from redis", error });
  }
});

router.post("/signup", async (req, res) => {
  let signUpBody = undefined;
  try {
    signUpBody = z
      .object({
        email: z.string().email(),
        password: z.string(),
      })
      .parse(req.body);
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Body not formatted correctly", error });
  }

  const { email, password } = signUpBody;

  const user = await prisma.user.findFirst({
    where: { email },
  });

  if (user)
    return res
      .status(400)
      .json({ message: "User with that email already exists" });

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  try {
    const user = await prisma.user.create({
      data: {
        email,
        passwordHash: hashedPassword,
      },
    });
    return res
      .status(200)
      .json({ message: "User created", user: exclude(user, ["passwordHash"]) });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "User could not be created", error });
  }
});

router.post("/signin", async (req, res) => {
  const signInBody = z.object({
    email: z.string().email(),
    password: z.string(),
  });

  const { email, password } = signInBody.parse(req.body);

  const user = await prisma.user.findFirst({
    where: { email },
  });

  if (!user)
    return res.status(404).json({ message: "This user does not exists" });

  if (!(await bcrypt.compare(password, user.passwordHash)))
    return res.status(404).json({ message: "Email or password wrong" });

  const sessionId = crypto.randomBytes(16).toString("hex");

  try {
    await redis.set(sessionId, user.id);
    res.cookie("sessionId", sessionId, {
      httpOnly: true,
      maxAge: 1000 * 60 * 30,
      signed: false,
    });
    return res
      .status(200)
      .json({ message: "User session created succesfully" });
  } catch (error) {
    return res.status(500).json({ message: "Could not create user session" });
  }
});

// eslint-disable-next-line import/no-anonymous-default-export
export default { router };
