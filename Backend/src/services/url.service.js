import crypto from "crypto";
import { Url } from "../model/url.model.js";
import { redisClient } from "../config/redis_client.js";

const validate_url_srv = (url) => {
  try {
    const parsed = new URL(url);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
};

const generateCode = (length) => {
  return crypto
    .randomBytes(Math.ceil((length * 3) / 4))
    .toString("base64url")
    .slice(0, length);
};

export const craete_shorturl_srv = async (url) => {
  console.log("In the  service  urls....");

  const validate_url = validate_url_srv(url);

  if (!validate_url) {
    const error = new Error("Invalid url");
    error.statusCode = 400;
    throw error;
  }

  const check_url_db = await Url.findOne({ longurl: url });
  if (check_url_db) {
    return check_url_db.shorturl;
  }
  const MAX_RETRIES = 5;
  for (let i = 0; i < MAX_RETRIES; i++) {
    try {
      const code = generateCode(6);
      const shorturl = `${process.env.BASE_URL}/${code}`;
      console.log("IN the generate the code...");

      const create_short_url = await Url.create({
        longurl: url,
        shortCode: code,
        shorturl,
      });
      console.log("SET IN THE REDIS");
      redisClient.on("connect", () => {
        console.log("Redis connected");
      });

      redisClient.on("error", (err) => {
        console.log("Redis error:", err);
      });
      await redisClient.set(`url:${code}`, url, "EX", 86400);
      await redisClient.hset("click_count", code, 0);

      return create_short_url.shorturl;
    } catch (error) {
      if (error.code === 11000) continue;
      throw error;
    }
  }
  throw new Error(
    "Failed to generate unique short code after multiple attempts",
  );
};

export const get_longul_srv = async (code) => {
  console.log("Here in get long url service", typeof code);
  const redis_search_code = await redisClient.get(`url:${code}`);
  console.log("Here in the redis search code", redis_search_code);
  if (redis_search_code != null) {
    const redis_click_counter = await redisClient.hincrby(
      "click_count",
      code,
      1,
    );
    console.log("Here in the redis click counter", redis_click_counter);
    return redis_search_code;
  } else {
    console.log("Here in the DB search code");
    const url_detail = await Url.findOne({ shortCode: code });
    if (!url_detail) {
      const error = new Error("URL NOT FOUND");
      error.statusCode = 400;
      throw error;
    }
    await redisClient.set(`url:${code}`, url_detail.longurl, { EX: 86400 });
    await redisClient.hincrby("click_count", code, 1);
    console.log("Here in the db click counter", url_detail.click_count);
    return url_detail.longurl;
  }
};

import cron from "node-cron";

// This pattern is know as catch aside
cron.schedule("*/30 * * * * *", async () => {
  console.log("Running cron job to update clicks on the urls...");
  const all_counts = await redisClient.hgetall("click_count");
  const operation = [];
  for (const code in all_counts) {
    const count = all_counts[code];
    if (Number(count) > 0) {
      operation.push({
        updateOne: {
          filter: { shortCode: code },
          update: {
            $inc: { click_count: Number(count) },
          },
        },
      });
    }
  }
  if (operation.length > 0) {
    await Url.bulkWrite(operation);
  }
  await redisClient.del("click_count");
});
