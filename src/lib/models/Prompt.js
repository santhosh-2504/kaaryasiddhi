import mongoose from "mongoose";

const promptSchema = new mongoose.Schema({
  themeName: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  promptLevel: {
    type: Number,
    required: true,
    min: 0,
  },
  promptText: {
    type: String,
    required: true,
    trim: true,
  },
  instructions: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Prompt = mongoose.models.Prompt || mongoose.model("Prompt", promptSchema);
