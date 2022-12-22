import { logger } from "../logger";
import { createClient } from "redis";

export const redis = createClient({
  url:
    process.env.REDIS_URL ||
    "redis://:eYVX7EwVmmxKPCDmwMtyKVge8oLd2t81@127.0.0.1:6379",
});

redis.on("error", (err) => logger.error(`Redis Client Error: ${err}`));

async function connectRedis() {
  await redis.connect();
}

connectRedis();

// export const redis = redisClient
