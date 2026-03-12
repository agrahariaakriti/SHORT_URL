import mongoose from "mongoose";
import { exit } from "process";
const DB_NAME = "URL_SHORTENER";

export const connect_DB = async () => {
  try {
    const connect = mongoose.connect(
      `${process.env.DB_URL}/${DB_NAME}?retryWrites=true&w=majority`,
    );
    console.log("DB connected SuccesFully");
  } catch (error) {
    console.log("DB connection Fail");

    throw new Error();
  }
};
