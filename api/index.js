import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoute from "./routes/auth.js";
import chatRoute from "./routes/chats.js";
import messageRoute from "./routes/messages.js";
import orderRoute from "./routes/orders.js";
import reviewRoute from "./routes/reviews.js";
import userRoute from "./routes/users.js";
import workRoute from "./routes/works.js";

mongoose.set("strictQuery", true);
const app = express();

const connect = async () => {
  try {
    await mongoose
      .connect(process.env.URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => console.log("connected"))
      .catch((err) => console.log(err));
  } catch (error) {
    console.log(error);
  }
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/chats", chatRoute);
app.use("/api/messages", messageRoute);
app.use("/api/orders", orderRoute);
app.use("/api/reviews", reviewRoute);
app.use("/api/users", userRoute);
app.use("/api/works", workRoute);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const errMsg = err.message || "something went wrong";

  return res.status(status).json(errMsg);
});

app.listen(8080, () => {
  connect();
  console.log("Server is listening on http://localhost:8080");
});
