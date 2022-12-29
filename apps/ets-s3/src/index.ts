import { logger } from "./logger";
import { checkPublicDir } from "./util";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import imageRouter from "./routers/image";

const S3_PORT = process.env.SERVICE_S3_PORT || 5001;

checkPublicDir();

const app = express();

app.use(
  cors({
    origin: [process.env.VITE_MOCK_URL || "http://localhost:7001"],
    methods: "*",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.static("./public"));
app.use(imageRouter.router);

app.listen(S3_PORT, () => {
  logger.log(`Server listening on port ${S3_PORT}`);
});
