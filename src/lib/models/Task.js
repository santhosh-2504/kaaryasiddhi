import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  levelNumber: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["linkedin", "github", "other"],
    required: true,
  },
  optional: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Task = mongoose.models.Task || mongoose.model("Task", taskSchema);
