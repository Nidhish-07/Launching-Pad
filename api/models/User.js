import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      unique: true,
      required: true,
    },
    img: {
      type: String,
    },
    isProvider: {
      type: Boolean,
      default: false,
    },
    phone: {
      type: String,
    },
    country: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
