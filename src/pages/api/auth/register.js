import dbConnect from "@/lib/dbConnect";
import { User } from "@/lib/models/User";
import { sendToken } from "@/utils/jwtToken";
import validator from "validator";

export default async function handler(req, res) {
  try {
    // Connect to database
    await dbConnect();

    if (req.method !== "POST") {
      return res.status(405).json({
        success: false,
        message: "Method not allowed",
      });
    }

    const { name, email, password, phone, parentPhone } = req.body;

    // Validate required fields
    if (!name || !email || !password || !phone || !parentPhone) {
      return res.status(400).json({
        success: false,
        message: "Please enter all required fields",
      });
    }

    // Additional validation
    if (name.length < 3 || name.length > 30) {
      return res.status(400).json({
        success: false,
        message: "Name must be between 3 and 30 characters",
      });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address",
      });
    }

    if (password.length < 8 || password.length > 32) {
      return res.status(400).json({
        success: false,
        message: "Password must be between 8 and 32 characters",
      });
    }

    if (
      !validator.isMobilePhone(phone.toString(), "any", { strictMode: false })
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid phone number",
      });
    }

    if (
      !validator.isMobilePhone(parentPhone.toString(), "any", {
        strictMode: false,
      })
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid parent phone number",
      });
    }

    if (phone === parentPhone) {
      return res.status(400).json({
        success: false,
        message: "Your phone number and parent phone number must be different",
      });
    }

    // Check for existing user by email
    const existingUserByEmail = await User.findOne({
      email: email.toLowerCase(),
    });
    if (existingUserByEmail) {
      return res.status(400).json({
        success: false,
        message: "User with this email already exists",
      });
    }

    // Check for existing user by phone
    const existingUserByPhone = await User.findOne({ phone: phone });
    if (existingUserByPhone) {
      return res.status(400).json({
        success: false,
        message: "User with this phone number already exists",
      });
    }

    // Create new user
    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password,
      phone: phone.toString(),
      parentPhone: parentPhone.toString(),
      role: "user",
      githubUsername: req.body.githubUsername?.trim() || "",
      linkedinUsername: req.body.linkedinUsername?.trim() || "",
      profilePicture: req.body.profilePicture || "",

    });

    // Send token and response
    sendToken(user, 201, res, "Registered Successfully");
  } catch (error) {
    console.error("Registration error:", error);

    // Handle mongoose validation errors
    if (error.name === "ValidationError") {
      const validationErrors = Object.values(error.errors).map(
        (err) => err.message,
      );
      return res.status(400).json({
        success: false,
        message: validationErrors.join(", "),
      });
    }

    // Handle duplicate key errors
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      return res.status(400).json({
        success: false,
        message: `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`,
      });
    }

    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
}

// Configure API to handle larger payloads if needed
export const config = {
  api: {
    bodyParser: {
      sizeLimit: "1mb",
    },
  },
};
