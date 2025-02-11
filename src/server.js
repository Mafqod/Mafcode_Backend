import mongoose from "mongoose";
import app from "./app.js";
import dotenv from "dotenv";

dotenv.config();
const DB_URI = process.env.DATABASE_URL;

mongoose
  .connect(DB_URI)
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((error) => console.log("database error", error.message));

const port = process.env.PORT;

app.listen(port, () => {
  console.log("Server is running on port " + port);
});
