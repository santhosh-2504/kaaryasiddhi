import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  month: {
    type: String,
    required: true,
  }, // e.g. "2025-06"
  amount: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    enum: ["due", "subscription"],
    required: true,
  },
  paidAt: {
    type: Date,
    default: Date.now,
  },
  screenshotUrl: {
    type: String,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  subscriptionExpiry: {
    type: Date, // Optional, used only if payment was accepted
  },
});

export const Payment =
  mongoose.models.Payment || mongoose.model("Payment", paymentSchema);
