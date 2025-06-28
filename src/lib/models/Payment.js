import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true 
  },
  month: { 
    type: String, required: true 
  }, // e.g. "2025-06"
  amount: { 
    type: Number, required: true 
  },
  paidAt: { 
    type: Date, default: Date.now 
  },
  screenshotUrl: { 
    type: String 
  },
  verified: { 
    type: Boolean, default: false 
  }
});

export const Payment = mongoose.models.Payment || mongoose.model("Payment", paymentSchema);
