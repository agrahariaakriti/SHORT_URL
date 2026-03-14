import express from "express";
import { urlroute } from "./src/routes/url.route.js";
import { userroute } from "./src/routes/user.routes.js";
import cookieParser from "cookie-parser";
import { rateLimiterMiddleware } from "./src/middleware/rate_limiter.middleware.js";
export const app = express();
import cors from "cors";
import helmet from "helmet";
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());
app.use(rateLimiterMiddleware);
app.use("/api/v1/user", userroute);
app.use("/api/v1/url", urlroute);
