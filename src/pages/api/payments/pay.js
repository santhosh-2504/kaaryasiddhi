import dbConnect from "@/lib/dbConnect";
import { Payment } from "@/lib/models/Payment";
import { User } from "@/lib/models/User";
import jwt from "jsonwebtoken";
import { catchAsync } from "@/lib/middlewares/catchAsync";

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1";
const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = process.env.CLOUDINARY_UPLOAD_PRESET;

// Required ENV check
if (!process.env.JWT_SECRET_KEY || !CLOUD_NAME || !UPLOAD_PRESET) {
  throw new Error("Required environment variables missing");
}

export default catchAsync(async (req, res) => {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, message: "Method not allowed" });
  }

  await dbConnect();

  const token = req.cookies.token;
  if (!token) {
    return res
      .status(401)
      .json({
        success: false,
        message: "Please login to access this resource",
      });
  }

  let user;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY, {
      algorithms: ["HS256"],
    });
    user = await User.findById(decoded._id);
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User not found" });
    }
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid or expired token" });
  }

  const { amount, base64, month, type } = req.body;

  if (!amount || !base64 || !month || !type) {
    return res.status(400).json({
      success: false,
      message: "Missing required fields: amount, base64, month, or type",
    });
  }

  // Upload base64 image to Cloudinary
  let screenshotUrl;
  try {
    const uploadRes = await fetch(
      `${CLOUDINARY_URL}/${CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: new URLSearchParams({
          file: base64,
          upload_preset: UPLOAD_PRESET,
          folder: "payments",
        }),
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      },
    );

    const uploadData = await uploadRes.json();

    if (!uploadData.secure_url) {
      throw new Error("Cloudinary upload failed");
    }

    screenshotUrl = uploadData.secure_url;
  } catch (err) {
    console.error("Cloudinary Upload Error:", err);
    return res
      .status(500)
      .json({ success: false, message: "Failed to upload screenshot" });
  }

  // Save to DB
  try {
    const payment = await Payment.create({
      userId: user._id,
      month,
      amount,
      type,
      paidAt: new Date(),
      screenshotUrl,
      verified: false,
      subscriptionExpiry: new Date(0),
    });

    res.status(201).json({
      success: true,
      message: "Payment submitted. Awaiting verification.",
      payment,
    });
  } catch (error) {
    console.error("Payment DB Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to save payment to database",
    });
  }
});
