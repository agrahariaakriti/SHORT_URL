import { redisClient } from "../config/redis_client.js";

export const rateLimiterMiddleware = async (req, res, next) => {
  try {
    const ip = req.ip;
    const key = `rateLimiterRedis:${ip}`;
    const get_user_ip = await redisClient.incr(key);
    console.log(get_user_ip);
    if (get_user_ip == 1) {
      await redisClient.expire(key, 60);
    } else if (Number(get_user_ip) > 100) {
      return res.status(429).json({
        message: "Too many request  please try again after sometime",
      });
    }
    next();
  } catch (error) {
    console.log(error);
    next();
  }
};
