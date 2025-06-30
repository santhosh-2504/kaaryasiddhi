import mongoose from "mongoose";

const testCaseSchema = new mongoose.Schema(
  {
    input: { type: [mongoose.Schema.Types.Mixed], required: true },
    expectedOutput: { type: mongoose.Schema.Types.Mixed, required: true },
    explanation: { type: String }, // Optional, useful for public TCs
    isHidden: { type: Boolean, default: false },
  },
  { _id: false },
);

const starterCodeSchema = new mongoose.Schema(
  {
    language: {
      type: String,
      enum: ["python", "java", "cpp", "javascript"],
      required: true,
    },
    code: { type: String, required: true },
  },
  { _id: false },
);

const solutionTemplateSchema = new mongoose.Schema(
  {
    language: {
      type: String,
      enum: ["python", "java", "cpp", "javascript"],
      required: true,
    },
    code: { type: String, required: true },
  },
  { _id: false },
);

const problemSchema = new mongoose.Schema({
  // Basic info
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  level: { type: Number, required: true, min: 0, max: 7 },
  description: { type: String, required: true }, // Markdown or HTML-safe
  functionName: { type: String, required: true }, // Name student must implement

  // Language support
  supportedLanguages: {
    type: [String],
    enum: ["python", "java", "cpp", "javascript"],
    default: ["python"],
  },
  starterCode: [starterCodeSchema],
  solutionTemplates: [solutionTemplateSchema],

  // Test cases
  testCases: [testCaseSchema], // All public and hidden

  // POTD flags
  isPOTD: { type: Boolean, default: false },
  potdDate: { type: Date }, // Optional for scheduling

  // Metadata
  tags: { type: [String], default: [] },
  difficulty: {
    type: String,
    enum: ["easy", "medium", "hard"],
    default: "easy",
  },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const Problem =
  mongoose.models.Problem || mongoose.model("Problem", problemSchema);
