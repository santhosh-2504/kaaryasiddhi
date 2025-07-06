import mongoose from "mongoose";

const toDoSubmissionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  toDoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ToDo",
    required: true,
  },
  levelNumber: {
    type: Number,
    required: true,
  },
  startedAt: {
    type: Date,
    required: true,
  },
  submittedAt: {
    type: Date,
  },
  status: {
    type: String,
    enum: ["in_progress", "submitted", "approved", "rejected"],
    default: "in_progress",
  },
  submissionLink: {
    type: String,
  },
  score: {
    type: Number,
    min: 0,
    max: 10,
    default: null,
  },
  remarks: {
    type: String,
  },
  reviewedAt: {
    type: Date,
  },
});

export const ToDoSubmission = mongoose.models.ToDoSubmission || mongoose.model("ToDoSubmission", toDoSubmissionSchema);
