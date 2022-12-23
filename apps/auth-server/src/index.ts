import { logger } from "./logger";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from './router';

const AUTH_PORT = process.env.AUTH_SERVICE_PORT || 5000;

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

app.use('/', authRouter.router);

app.listen(AUTH_PORT, () => {
  logger.log(`Server listening on port ${AUTH_PORT}`);
});
