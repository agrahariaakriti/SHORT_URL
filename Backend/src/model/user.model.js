import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    fullname: {
      type: String,
      required: true,
    },
    hashPassword: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamsp: true },
);

export const User = mongoose.model("User", userSchema);
