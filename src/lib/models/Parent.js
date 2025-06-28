import mongoose from 'mongoose';
import validator from "validator";

const parentSchema = new mongoose.Schema({
  name: { 
    type: String, required: true 
  },
  phone: { 
    type: String, required: true, unique: true,
    validate: [validator.isMobilePhone, "Please Provide Valid Phone Number"]
  },
  email: { 
    type: String,
    validate: [validator.isEmail, "Please Provide Valid Email"]
  },
  password: { 
    type: String, required: true 
  },
  studentId: { 
    type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true 
  },
  createdAt: { 
    type: Date, default: Date.now 
  }
});

export const Parent = mongoose.models.Parent || mongoose.model("Parent", parentSchema);