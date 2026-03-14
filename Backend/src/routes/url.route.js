import {
  create_short_url,
  redirect_url_frontend,
  click_tracker,
} from "../controllers/url.controller.js";
import { Router } from "express";
export const urlroute = Router();
import { tokenvarify_middleware } from "../middleware/auth.middleware.js";

urlroute.post("/shorturl", tokenvarify_middleware, create_short_url);
urlroute.get("/:code", tokenvarify_middleware, redirect_url_frontend);

urlroute.get("/clicks/:code", tokenvarify_middleware, click_tracker);
