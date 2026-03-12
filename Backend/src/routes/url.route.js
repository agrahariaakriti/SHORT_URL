import {
  create_short_url,
  redirect_url,
  click_tracker,
} from "../controllers/url.controller.js";
import { Router } from "express";
export const urlroute = Router();
import { tokenvarify_middleware } from "../middleware/auth.middleware.js";

urlroute.post("/shorturl", tokenvarify_middleware, create_short_url);
urlroute.get(
  "/:code",
  tokenvarify_middleware,
  (req, res, next) => {
    console.log("Here in the url route", req.params.code);
    next();
  },
  redirect_url,
);

urlroute.get("/clicks", tokenvarify_middleware, click_tracker);
