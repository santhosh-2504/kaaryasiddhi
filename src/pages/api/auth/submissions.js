import { catchAsync } from "@/lib/middlewares/catchAsync";
import { isAuthenticated } from "@/lib/middlewares/auth";
import dbConnect from "@/lib/dbConnect";
import { Submission } from "@/lib/models/Submission";

export default catchAsync(async (req, res) => {
  await dbConnect();

  if (req.method !== "GET") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  }

  // Authenticate user (no callback)
  await isAuthenticated(req, res);

  try {
    // Fetch all submissions for the authenticated user
    const submissions = await Submission.find({
      userId: req.user._id,
    })
      .populate("taskId", "title type optional levelNumber status")
      .sort({ submittedAt: -1 });

    res.status(200).json({
      success: true,
      data: submissions,
    });
  } catch (error) {
    console.error("Fetch submissions error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});
