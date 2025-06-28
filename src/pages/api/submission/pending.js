import { catchAsync } from "@/lib/middlewares/catchAsync";
import dbConnect from "@/lib/dbConnect";
import { Submission } from "@/lib/models/Submission";
import { User } from "@/lib/models/User";
import { Task } from "@/lib/models/Task";
import jwt from "jsonwebtoken";

// Add validation for required environment variables
if (!process.env.JWT_SECRET_KEY) {
  throw new Error("JWT_SECRET_KEY must be defined in environment variables");
}

export default catchAsync(async (req, res) => {
  if (req.method !== "GET") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  await dbConnect();

  // 1. Extract and verify token
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
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
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }

  // 2. Fetch user and check role
  const user = await User.findById(decoded._id).select("-password");
  if (!user) {
    return res.status(401).json({
      success: false,
      message: "User not found",
    });
  }

  if (user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Access denied: Admins only",
    });
  }

  // 3. Fetch pending submissions with user and task details, sorted by oldest first
  const submissions = await Submission.find({ status: "pending" })
    .populate("userId", "name email")
    .populate("taskId", "title type levelNumber")
    .sort({ submittedAt: 1 }); // 1 for ascending (oldest first)

  res.status(200).json({
    success: true,
    data: submissions,
  });
});