import { catchAsync } from "@/lib/middlewares/catchAsync";
import { isAuthenticated } from "@/lib/middlewares/auth";
import dbConnect from "@/lib/dbConnect";
import { Submission } from "@/lib/models/Submission";
import { Task } from "@/lib/models/Task";

export default catchAsync(async (req, res) => {
  await dbConnect();

  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  }

  await isAuthenticated(req, res);

  const { taskId, levelNumber, submissionLink } = req.body;
  const parsedLevelNumber = Number(levelNumber);

  if (!taskId || parsedLevelNumber == null || !submissionLink) {
    return res.status(400).json({
      success: false,
      message: "Task ID, level number, and submission link are required",
    });
  }

  const urlPattern = /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/;
  if (!urlPattern.test(submissionLink)) {
    return res.status(400).json({
      success: false,
      message: "Please provide a valid submission link",
    });
  }

  try {
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    if (task.levelNumber !== parsedLevelNumber) {
      return res.status(400).json({
        success: false,
        message: "Level number mismatch",
      });
    }

    const existingSubmission = await Submission.findOne({
      userId: req.user._id,
      taskId: taskId,
    });

    if (existingSubmission) {
      if (existingSubmission.status === 'rejected') {
        existingSubmission.submissionLink = submissionLink;
        existingSubmission.status = 'pending';
        existingSubmission.submittedAt = Date.now();
        existingSubmission.reviewedAt = undefined;
        existingSubmission.remarks = undefined;
        existingSubmission.score = null;
        await existingSubmission.save();

        const populatedSubmission = await Submission.findById(existingSubmission._id)
          .populate('taskId', 'title type optional')
          .populate('userId', 'name email');

        return res.status(200).json({
          success: true,
          message: "Task resubmitted successfully",
          data: populatedSubmission,
        });
      } else {
        return res.status(400).json({
          success: false,
          message: "You have already submitted this task",
        });
      }
    }

    const newSubmission = await Submission.create({
      userId: req.user._id,
      taskId,
      levelNumber: parsedLevelNumber,
      submissionLink,
      status: "pending",
    });

    const populatedSubmission = await Submission.findById(newSubmission._id)
      .populate('taskId', 'title type optional')
      .populate('userId', 'name email');

    return res.status(201).json({
      success: true,
      message: "Task submitted successfully",
      data: populatedSubmission,
    });

  } catch (error) {
    console.error("Submission error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});
