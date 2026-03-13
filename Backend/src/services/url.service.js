import crypto from "crypto";
import { Url } from "../model/url.model.js";
import { redisClient } from "../config/redis_client.js";
import cron from "node-cron";

/* ------------------ URL VALIDATION ------------------ */

const validate_url_srv = (url) => {
  try {
    const parsed = new URL(url);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
};

/* ------------------ CODE GENERATOR ------------------ */

const generateCode = (length) => {
  return crypto
    .randomBytes(Math.ceil((length * 3) / 4))
    .toString("base64url")
    .slice(0, length);
};

/* ------------------ CREATE SHORT URL ------------------ */

export const craete_shorturl_srv = async (url) => {
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

      const create_short_url = await Url.create({
        longurl: url,
        shortCode: code,
        shorturl,
      });

      /* Redis cache (safe execution) */
      try {
        await redisClient.set(`url:${code}`, url, "EX", 86400);
        await redisClient.hset("click_count", code, 0);
      } catch (redisErr) {
        console.error("Redis cache error:", redisErr.message);
      }

      return create_short_url.shorturl;
    } catch (error) {
      if (error.code === 11000) continue;
      throw error;
    }
  }

  throw new Error("Failed to generate unique short code");
};

/* ------------------ GET LONG URL ------------------ */

export const get_longul_srv = async (code) => {
  try {
    const redisUrl = await redisClient.get(`url:${code}`);

    if (redisUrl) {
      try {
        const res = await redisClient.hincrby("click_count", code, 1);
      } catch (err) {
        console.error("Redis increment error:", err.message);
      }

      return redisUrl;
    }
  } catch (err) {
    console.error("Redis read error:", err.message);
  }

  /* Fallback to MongoDB */
  const url_detail = await Url.findOne({ shortCode: code });

  if (!url_detail) {
    const error = new Error("URL NOT FOUND");
    error.statusCode = 404;
    throw error;
  }

  try {
    await redisClient.set(`url:${code}`, url_detail.longurl, "EX", 86400);
    await redisClient.hincrby("click_count", code, 1);
  } catch (redisErr) {
    console.error("Redis fallback error:", redisErr.message);
  }

  return url_detail.longurl;
};

/* ------------------ GET CLICK COUNT ------------------ */

export const get_clicks_srv = async (code) => {
  try {
    const url = await Url.findOne({ shortCode: code }).select("click_count");

    let redisClicks = 0;

    try {
      const redisVal = await redisClient.hget("click_count", code);
      redisClicks = parseInt(redisVal) || 0;
    } catch (redisErr) {
      console.error("Redis fetch error:", redisErr.message);
    }

    const totalClicks = (url?.click_count || 0) + redisClicks;

    return totalClicks;
  } catch (error) {
    console.error("Click count error:", error);
    throw error;
  }
};

/* ------------------ CRON JOB ------------------ */
/* Persist Redis click counts to MongoDB every 3 minutes */

cron.schedule("*/3 * * * *", async () => {
  try {
    console.log("Running click sync cron job...");

    const all_counts = await redisClient.hgetall("click_count");
    if (!all_counts || Object.keys(all_counts).length === 0) {
      return;
    }

    const operations = [];

    for (const code in all_counts) {
      const count = Number(all_counts[code]);

      if (count > 0) {
        operations.push({
          updateOne: {
            filter: { shortCode: code },
            update: { $inc: { click_count: count } },
          },
        });
      }
    }

    if (operations.length > 0) {
      await Url.bulkWrite(operations);
    }

    await redisClient.del("click_count");
  } catch (error) {
    console.error("Cron job failed:", error);
  }
});
