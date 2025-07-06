import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validator from "validator";
import { Profiler } from "react";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: [3, "Name must contain at least 3 characters"],
    maxLength: [30, "Wrong Name"],
  },
  email: {
    type: String,
    required: true,
    validate: [validator.isEmail, "Please Provide Valid Email"],
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  phone: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return validator.isMobilePhone(v, "any", { strictMode: false });
      },
      message: "Please Provide Valid Phone Number",
    },
  },
  password: {
    type: String,
    required: true,
    minLength: [8, "At least 8 characters"],
    maxLength: [32, "Password too large"],
    select: false,
  },
  address: {
    type: String,
  },
  currentLevel: {
    type: Number,
    default: 0,
  },
  streak: {
    type: Number,
    default: 0,
  },
  isStreakFrozen: {
    type: Boolean,
    default: false,
  },
  parentPhone: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return validator.isMobilePhone(v, "any", { strictMode: false });
      },
      message: "Please Provide Valid Parent Phone Number",
    },
  },
  isSubscribed: {
    type: Boolean,
    default: false,
  },
  subscriptionExpiry: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  resetPasswordOTP: {
    type: String,
    select: false,
  },
  resetPasswordOTPExpiry: {
    type: Date,
    select: false,
  },
  // Add these fields to your User schema
  githubUsername: {
    type: String,
    maxLength: [39, "GitHub username too long"],
  },
  linkedinUsername: {
    type: String,
    maxLength: [100, "LinkedIn username too long"],
  },
  profilePicture: {
    type: String,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  if (!enteredPassword) {
    throw new Error("Password is required");
  }

  if (!this.password) {
    throw new Error("User password not found");
  }

  try {
    const isMatch = await bcrypt.compare(enteredPassword, this.password);
    return isMatch;
  } catch (error) {
    throw new Error("Failed to verify password");
  }
};

userSchema.methods.getJWTToken = function () {
  return jwt.sign(
    {
      _id: this._id.toString(),
      version: 1, // Add a version to help with token validation
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: process.env.JWT_EXPIRE || "7d",
      algorithm: "HS256", // Explicitly specify the algorithm
    },
  );
};

export const User = mongoose.models.User || mongoose.model("User", userSchema);
