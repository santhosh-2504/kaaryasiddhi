import mongoose from "mongoose";

const StreakLogSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true },
);

// To prevent duplicate entries per user per day
StreakLogSchema.index({ user: 1, date: 1 }, { unique: true });

export const Streak =
  mongoose.models.Streak || mongoose.model("Streak", StreakLogSchema);
