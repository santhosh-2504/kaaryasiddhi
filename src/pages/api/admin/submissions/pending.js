import { catchAsync } from "@/lib/middlewares/catchAsync";
import dbConnect from "@/lib/dbConnect";
import { ToDoSubmission } from "@/lib/models/ToDoSubmission";
import { User } from "@/lib/models/User";
import jwt from "jsonwebtoken";

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

  // 1. Auth
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
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }

  const user = await User.findById(decoded._id).select("-password");
  if (!user || user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Access denied: Admins only",
    });
  }

  // 2. Get pending submissions
  const pendingSubmissions = await ToDoSubmission.find({ status: "submitted" })
    .sort({ submittedAt: -1 })
    .populate("userId", "name email currentLevel")
    .populate("toDoId", "title levelNumber");

  res.status(200).json({
    success: true,
    count: pendingSubmissions.length,
    data: pendingSubmissions,
  });
});
