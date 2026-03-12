import { User } from "../model/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export const validate_email = (email) => {
  const reg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;
  return reg.test(email);
};

export const validate_password = (password) => {
  const reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
  return reg.test(password);
};

export const validate_username = (username) => {
  const reg = /^[A-Za-z][A-Za-z0-9_]{2,19}$/;
  return reg.test(username);
};

export const find_user_by_email = async (email) => {
  const user = await User.findOne({ email }).select(
    "-hashPassword -refreshToken",
  );
  console.log("Here in SERVICE....", user);

  return user;
};

//================================================================ BUSSINESS LOGIC ==================================================

export const create_user_srv = async (username, fullname, email, password) => {
  const user = await find_user_by_email(email);
  const email_validate = validate_email(email);
  if (!email_validate) {
    const error = new Error("Invalid Email");
    error.statusCode = 400;
    throw error;
  }

  const username_validate = validate_username(username);
  if (!username_validate) {
    const error = new Error(
      "Username must be 3–20 characters, start with a letter, and contain only letters, numbers, or underscores.",
    );
    error.statusCode = 400;
    throw error;
  }

  const password_validate = validate_password(password);
  if (!password_validate) {
    const error = new Error(
      "Password must be at least 8 characters and include 1 lowercase, 1 uppercase, 1 digit, and 1 special character (@$!%*?&).",
    );
    error.statusCode = 400;
    throw error;
  }
  if (user) {
    const error = new Error("User already exist with this email");
    error.statusCode = 409;
    throw error;
  }

  // Store hash in your password DB.
  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(password, salt);

  const new_user = await User.create({
    email,
    hashPassword,
    fullname,
    username,
  });
  return {
    email: new_user.email,
    fullname: new_user.fullname,
    username: new_user.username,
  };
};

export const find_user_srv = async (email, password) => {
  const email_formate = validate_email(email);
  if (!email_formate) {
    const error = new Error("Invalid Email");
    error.statusCode = 400;
    throw error;
  }

  const user = await User.findOne({ email });
  if (!user) {
    const error = new Error("User Not Found with this email");
    error.statusCode = 401;
    throw error;
  }

  const validate_password = bcrypt.compareSync(password, user.hashPassword);
  if (!validate_password) {
    const error = new Error("Invalid Password");
    error.statusCode = 401;
    throw error;
  }
  // Generate JWT token
  const accessToken = jwt.sign(
    {
      email: user.email,
      userId: user._id,
      username: user.username,
    },
    process.env.JWT_ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.JWT_ACCESS_EXPIRES_IN },
  );
  const refreshToken = jwt.sign(
    { userId: user._id },
    process.env.JWT_REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN },
  );
  const hashRefrehToken = bcrypt.hashSync(refreshToken, 10);
  user.refreshToken = hashRefrehToken;
  await user.save();
  return {
    email: user.email,
    fullname: user.fullname,
    username: user.username,
    accessToken,
    refreshToken,
  };
};

export const user_logout_srv = async (user) => {
  await User.findByIdAndUpdate(user.userId, {
    refreshToken: null,
  });
  return;
};

export const refresh_handler_srv = async (refreshToken) => {
  try {
    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_TOKEN_SECRET,
    );
  } catch (error) {
    const err = new Error("Invalid Refresh Token Redirect to login page");
    err.statusCode = 401;
    throw err;
  }

  if (!decoded) {
    const error = new Error("Invalid Refresh Token");
    error.statusCode = 401;
    throw error;
  }

  const user = await User.findById(decoded.userId);

  if (!user || !user.refreshToken) {
    const error = new Error("Invalid User");
    error.statusCode = 401;
    throw error;
  }
  const isMatch = bcrypt.compareSync(refreshToken, user.refreshToken);

  if (!isMatch) {
    const error = new Error("Invalid Refresh Token");
    error.statusCode = 401;
    throw error;
  }
  const accessToken = jwt.sign(
    {
      email: user.email,
      username: user.username,
      userId: user._id,
    },
    process.env.JWT_ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.JWT_ACCESS_EXPIRES_IN },
  );
  return accessToken;
};
