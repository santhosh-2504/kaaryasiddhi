import { catchAsync } from "@/lib/middlewares/catchAsync";
import dbConnect from "@/lib/dbConnect";
import { User } from "@/lib/models/User";
import { Potd } from "@/lib/models/Potd";
import jwt from "jsonwebtoken";

// Ensure JWT secret is present
if (!process.env.JWT_SECRET_KEY) {
  throw new Error("JWT_SECRET_KEY must be defined in environment variables");
}

export default catchAsync(async (req, res) => {
  if (req.method !== "GET") {
    return res
      .status(405)
      .json({ success: false, message: "Method not allowed" });
  }

  await dbConnect();

  // 1. Verify token
  const token = req.cookies.token;
  if (!token) {
    return res
      .status(401)
      .json({
        success: false,
        message: "Please login to access this resource",
      });
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET_KEY, {
      algorithms: ["HS256"],
    });
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }

  // 2. Get user
  const user = await User.findById(decoded._id).select("currentLevel");
  if (!user) {
    return res.status(401).json({ success: false, message: "User not found" });
  }

  const level = user.currentLevel || 0;
  const today = new Date().toISOString().split("T")[0]; // "YYYY-MM-DD"

  // 3. Get today's PotD for this level
  const potd = await Potd.findOne({ level, date: today, isActive: true });

  if (!potd) {
    return res
      .status(404)
      .json({
        success: false,
        message: `No PotD found for Level ${level} today`,
      });
  }

  res.status(200).json({ success: true, data: potd });
});
