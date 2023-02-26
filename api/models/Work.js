import mongoose from "mongoose";

const workSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    starNumber: { type: Number, default: 0 },
    totalStars: {
      type: Number,
      default: 0,
    },
    cat: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      required: true,
    },
    coverImg: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      required: false,
    },
    shortTitle: {
      type: String,
      required: true,
    },
    shortDesc: {
      type: String,
      required: true,
    },
    deliveryTime: {
      type: Number,
      required: true,
    },
    revisionNumber: {
      type: Number,
      required: true,
    },
    features: {
      type: [String],
    },
    sales: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Work", workSchema);
