import mongoose from "mongoose";

const planSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    link: String,
    images: [String], // URLs o nombres de archivos si se suben
    rating: { type: Number, min: 1, max: 5, default: 1 },
    status: { type: String, enum: ["To Do", "Done"], default: "To Do" },
    tags: [String],
  },
  {
    timestamps: true,
  }
);

const Plan = mongoose.model("Plan", planSchema);

export default Plan;
