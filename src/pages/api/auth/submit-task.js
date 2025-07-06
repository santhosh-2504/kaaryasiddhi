import { catchAsync } from "@/lib/middlewares/catchAsync";
import { isAuthenticated } from "@/lib/middlewares/auth";
import dbConnect from "@/lib/dbConnect";
import { ToDoSubmission } from "@/lib/models/ToDoSubmission";
import { ToDo } from "@/lib/models/ToDo";

export default catchAsync(async (req, res) => {
  await dbConnect();

  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  }

  await isAuthenticated(req, res);

  const { toDoId, submissionLink } = req.body;

  if (!toDoId || !submissionLink) {
    return res.status(400).json({
      success: false,
      message: "ToDo ID and submission link are required",
    });
  }

  const urlPattern = /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/;
  if (!urlPattern.test(submissionLink)) {
    return res.status(400).json({
      success: false,
      message: "Please provide a valid submission link",
    });
  }

  // 1. Check ToDo exists
  const toDo = await ToDo.findById(toDoId);
  if (!toDo) {
    return res.status(404).json({
      success: false,
      message: "ToDo not found",
    });
  }

  // 2. Find submission
  const submission = await ToDoSubmission.findOne({
    userId: req.user._id,
    toDoId,
  });

  if (!submission) {
    return res.status(404).json({
      success: false,
      message: "You have not started this task yet",
    });
  }

  if (submission.status !== "in_progress") {
    return res.status(400).json({
      success: false,
      message: `Cannot submit. Task is already ${submission.status}`,
    });
  }

  // 3. Update
  submission.submissionLink = submissionLink;
  submission.submittedAt = new Date();
  submission.status = "submitted";
  await submission.save();

  const populated = await ToDoSubmission.findById(submission._id)
    .populate("toDoId", "title levelNumber")
    .populate("userId", "name email");

  return res.status(200).json({
    success: true,
    message: "ToDo task submitted successfully",
    data: populated,
  });
});
