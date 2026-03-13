import Router from "express";
import {
  signup,
  signin,
  logout,
  refresh,
} from "../controllers/user.controller.js";
import { tokenvarify_middleware } from "../middleware/auth.middleware.js";

export const userroute = Router();

userroute.post("/signup", signup);

userroute.post("/signin", signin);
userroute.get("/refresh", refresh);
userroute.get("/logout", logout);
