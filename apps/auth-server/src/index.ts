import { logger } from "./logger";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./router";

const AUTH_PORT = process.env.SERVICE_AUTH_PORT || 5000;
const ALLOWED_ORIGINS: string[] = [
  process.env.VITE_WEB_COMMON_URL || "http://localhost:3000", // Web Common
];

const app = express();

app.use(
  cors({
    origin: ALLOWED_ORIGINS,
    methods: "*",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter.router);

app.listen(AUTH_PORT, () => {
  logger.log(`Server listening on port ${AUTH_PORT}`);
});
