import mongoose from "mongoose";

const urlSchema = new mongoose.Schema(
  {
    longurl: {
      type: String,
      required: true,
    },
    shorturl: {
      type: String,
      required: true,
    },
    shortCode: {
      type: String,
      required: true,
      unique: true,
    },
    click_count: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

export const Url = mongoose.model("Url", urlSchema);
