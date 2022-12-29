import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import * as trpcExpress from "@trpc/server/adapters/express";
import { appRouter } from "./server";
import { createContext } from "./context";
import { logger } from "../logger";

const PORT = process.env.SERVICE_SERVER_TEMPLATE_PORT || 3999;
const ALLOWED_ORIGINS = []; // Configure allowed origins when starting from this template

const app = express();

app.use(
  cors({
    // origin: ALLOWED_ORIGINS,    // ALL ORIGINS ARE ALLOWED
    origin: ["http://localhost:2999"],
    methods: "*",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

app.listen(PORT, () => {
  logger.log(`Server listening on port ${PORT}`);
});
