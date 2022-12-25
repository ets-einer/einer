import { PrismaClient } from "@prisma/client";
import * as trpcExpress from "@trpc/server/adapters/express";
import { inferAsyncReturnType } from "@trpc/server";
import axios, { AxiosError } from "axios";
import type { User } from "./../../auth/src/lib/prisma";

const prisma = new PrismaClient();

const authUrl = `${process.env.VITE_SERVICE_AUTH_URL}/ms/me`;

type CreateContextOk = {
  prisma: typeof prisma;
  ok: true;
  user: User;
};

type CreateContextErr = {
  prisma: typeof prisma;
  ok: false;
  responseError: AxiosError;
};

export const createContext: ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => Promise<
  CreateContextOk | CreateContextErr
> = async ({ req, res }: trpcExpress.CreateExpressContextOptions) => {
  console.log("COOKIES:", req.cookies)
  try {
    const res = await axios.post(authUrl, { sessionId: req.cookies.sessionId });

    return { prisma, ok: true, user: res.data.user } as CreateContextOk;
  } catch (err) {
    return { prisma, ok: false, responseError: err } as CreateContextErr;
  }
};

export type Context = inferAsyncReturnType<typeof createContext>;
