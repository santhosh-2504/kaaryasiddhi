import mongoose from "mongoose";

// Reusable schema for both public and hidden test cases
const testCaseSchema = new mongoose.Schema({
  input: { type: String, required: true },
  expectedOutput: { type: String, required: true },
  explanation: { type: String }, // Optional, mainly for public test cases
});

// Main PotD schema
const potdSchema = new mongoose.Schema({
  level: {
    type: Number,
    required: true,
    min: 0,
    max: 7,
  },
  date: {
    type: String, // Format: YYYY-MM-DD (e.g., "2025-06-27")
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  starterCode: {
    javascript: {
      type: String,
      default: `function main(input) {\n  // your code here\n}\n\nmain(input);`,
    },
    python: { type: String },
    java: { type: String },
  },
  publicTestCases: {
    type: [testCaseSchema],
    default: [],
  },
  hiddenTestCases: {
    type: [testCaseSchema],
    default: [],
  },
  tags: {
    type: [String],
    default: [],
  },
  difficulty: {
    type: String,
    enum: ["Easy", "Medium", "Hard"],
    default: "Easy",
  },
  author: {
    type: String,
    default: "admin",
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: () => new Date(),
  },
  updatedAt: {
    type: Date,
    default: () => new Date(),
  },
});

// Ensure only one PotD per level per date
potdSchema.index({ level: 1, date: 1 }, { unique: true });

export const Potd = mongoose.models.Potd || mongoose.model("Potd", potdSchema);
