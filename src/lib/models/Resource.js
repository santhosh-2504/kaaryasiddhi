import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  tags: [
    {
      type: String,
    },
  ],
  level: {
    type: Number,
  },
  type: {
    type: String,
    enum: ["video", "pdf", "blog", "course", "other"],
    default: "other",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export const Resource =
  mongoose.models.Resource || mongoose.model("Resource", resourceSchema);
