import mongoose from "mongoose";

const toDoSchema = new mongoose.Schema({
  levelNumber: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  instructions: {
    type: [String], 
    required: true,
  },
  resources: {
    type: [String],
    default: [],
  },
  timeLimit: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const ToDo = mongoose.models.ToDo || mongoose.model("ToDo", toDoSchema);
