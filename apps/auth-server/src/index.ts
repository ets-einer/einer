import { logger } from "./logger";
import express from "express";
import cors from "cors";
import { z } from "zod";
import { prisma } from "./lib/prisma";
import crypto from "crypto";
import cookieParser from "cookie-parser";
import { redis } from "@src/lib/redis";
import { authenticate, authenticateMicroserviceCall } from "./lib/authenticate";
import type { Request, Response, NextFunction } from "express";

const AUTH_PORT = process.env.PORT || 4001;

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3001"],
    methods: "*",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.get("/", async (req, res) => {
  return res.status(200).json({ message: "Hello World" });
});

app.get("/me", [authenticate], (req: Request, res: Response) => {
  // console.log(res.locals.user.id)
  return res
    .status(200)
    .json({ message: "User retrieved successfully", user: req.user });
});

app.post(
  "/ms/me",
  [authenticateMicroserviceCall],
  (req: Request, res: Response) => {
    // console.log(res.locals.user.id)
    return res
      .status(200)
      .json({ message: "User retrieved successfully", user: req.user });
  }
);

app.post("/signout", async (req: Request, res: Response) => {
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
      .json({ message: "Could not delete session from redis" });
  }
});

app.post("/signup", async (req, res) => {
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

  // const hashedPassword = await bcrypt.hash(password, 10)

  try {
    const user = await prisma.user.create({
      data: {
        email,
        passwordHash: password,
      },
    });
    return res.status(200).json({ message: "User created", user });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "User could not be created", error });
  }
});

app.post("/signin", async (req, res) => {
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

  if (user.passwordHash !== password)
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

app.listen(AUTH_PORT, () => {
  logger.log(`Server listening on port ${AUTH_PORT}`);
});
