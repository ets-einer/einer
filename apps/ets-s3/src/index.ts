import { logger } from './logger';
import { checkPublicDir } from './util';
import express from 'express';
import imageRouter from './routers/image';

const S3_PORT = process.env.SERVICE_S3_PORT || 5001;

checkPublicDir();

const app = express();

app.use(express.static('./public'));
app.use(imageRouter.router);

app.listen(S3_PORT, () => {
    logger.log(`Server listening on port ${S3_PORT}`)
})