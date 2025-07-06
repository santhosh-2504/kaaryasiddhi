import mongoose from "mongoose";

const linkedinSubmissionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  postLink: {
    type: String,
    required: true,
    trim: true,
  },
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
  score: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  feedback: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const LinkedinSubmission = mongoose.models.LinkedinSubmission || mongoose.model("LinkedinSubmission", linkedinSubmissionSchema);
