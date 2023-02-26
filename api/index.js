import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose.set("strictQuery", true);
const app = express();

const connect = async () => {
  try {
    mongoose
      .connect(process.env.MONGODB_URI)
      .then(() => console.log("DB connected"))
      .catch((err) => {
        throw err;
      });
    console.log("DB connected");
  } catch (error) {
    console.log(error);
  }
};

app.listen(8080, () => {
  connect();
  console.log("Server is listening on http://localhost:8080");
});
