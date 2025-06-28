import { catchAsync } from "@/lib/middlewares/catchAsync";
import dbConnect from "@/lib/dbConnect";
import { Submission } from "@/lib/models/Submission";
import { User } from "@/lib/models/User";
import jwt from "jsonwebtoken";

// Add validation for required environment variables
if (!process.env.JWT_SECRET_KEY) {
  throw new Error("JWT_SECRET_KEY must be defined in environment variables");
}

export default catchAsync(async (req, res) => {
  if (req.method !== "PUT") {
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

  // 3. Extract and validate request body
  const { submissionId, status, score, remarks } = req.body;

  if (!submissionId || !status) {
    return res.status(400).json({
      success: false,
      message: "Submission ID and status are required",
    });
  }

  if (!["approved", "rejected"].includes(status)) {
    return res.status(400).json({
      success: false,
      message: "Status must be either 'approved' or 'rejected'",
    });
  }

  // 4. Validate based on status
  if (status === "approved") {
    if (score === undefined || score === null) {
      return res.status(400).json({
        success: false,
        message: "Score is required when approving a submission",
      });
    }
    if (score < 0 || score > 10) {
      return res.status(400).json({
        success: false,
        message: "Score must be between 0 and 10",
      });
    }
  }

  if (status === "rejected") {
    if (!remarks || remarks.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Remarks are required when rejecting a submission",
      });
    }
  }

  // 5. Find and update submission
  const submission = await Submission.findById(submissionId);
  if (!submission) {
    return res.status(404).json({
      success: false,
      message: "Submission not found",
    });
  }

  if (submission.status !== "pending") {
    return res.status(400).json({
      success: false,
      message: "Only pending submissions can be updated",
    });
  }

  // 6. Update submission
  const updateData = {
    status,
    reviewedAt: new Date(),
  };

  if (status === "approved") {
    updateData.score = score;
    if (remarks && remarks.trim() !== "") {
      updateData.remarks = remarks.trim();
    }
  } else if (status === "rejected") {
    updateData.remarks = remarks.trim();
  }

  const updatedSubmission = await Submission.findByIdAndUpdate(
    submissionId,
    updateData,
    { new: true }
  ).populate("userId", "name email")
   .populate("taskId", "title type levelNumber");

  res.status(200).json({
    success: true,
    message: `Submission ${status} successfully`,
    data: updatedSubmission,
  });
});