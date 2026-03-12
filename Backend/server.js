import dotenv from "dotenv";
dotenv.config();
import { connect_DB } from "./src/DB/db.js";
import { app } from "./index.js";

connect_DB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`The server started at ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    log("Database not connected ", error);
  });
