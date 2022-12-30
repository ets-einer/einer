import { CookieOptions, Router } from "express";
import { z } from "zod";
import { prisma, User } from "./lib/prisma";
import crypto from "crypto";
import { redis } from "@src/lib/redis";
import { authenticate } from "./lib/middleware";
import type { Request, Response } from "express";
import { exclude } from "./lib/util";
import { comparePassword, hashPassword } from "./lib/hash";

const router = Router();

const SESSION_COOKIE_MAX_AGE = 1000 * 60 * 60 * 24;
const SESSION_COOKIE_OPTS: CookieOptions = {
  httpOnly: true,
  maxAge: SESSION_COOKIE_MAX_AGE,
  signed: false,
  sameSite: "lax",
};

export const sessionValueSchema = z.object({
  userId: z.string(),
  createdAt: z.number(),
});

router.get("/me", [authenticate], (req: Request, res: Response) => {
  return res.status(200).json({
    message: "User retrieved successfully",
    user: exclude(req.user as User, ["passwordHash"]),
  });
});

router.post("/ms/me", [authenticate], (req: Request, res: Response) => {
  return res.status(200).json({
    message: "User retrieved successfully",
    user: exclude(req.user as User, ["passwordHash"]),
  });
});

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

  res.clearCookie("sessionId");

  try {
    await redis.del(sessionId);
    return res.status(200).json({ message: "Sign out succesfully" }).end();
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Could not delete session from redis", error })
      .end();
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

  const hashedPassword = await hashPassword(password);

  try {
    const user = await prisma.user.create({
      data: {
        email,
        passwordHash: hashedPassword,
        permissions: {
          connectOrCreate: {
            create: {
              id: 0,
              name: "USER",
            },
            where: {
              id: 0,
            },
          },
        },
      },
      include: {
        permissions: {},
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

  if (!(await comparePassword(password, user.passwordHash)))
    return res.status(404).json({ message: "Email or password wrong" });

  const sessionId = crypto.randomBytes(16).toString("hex");

  try {
    await redis.set(
      sessionId,
      JSON.stringify(
        sessionValueSchema.parse({ userId: user.id, createdAt: Date.now() })
      )
    );
    res.cookie("sessionId", sessionId, SESSION_COOKIE_OPTS);
    return res
      .status(200)
      .json({ message: "User session created succesfully" });
  } catch (error) {
    return res.status(500).json({ message: "Could not create user session" });
  }
});

// eslint-disable-next-line import/no-anonymous-default-export
export default { router };
