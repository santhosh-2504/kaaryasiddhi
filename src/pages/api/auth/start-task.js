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

  const { toDoId, levelNumber } = req.body;
  const parsedLevelNumber = Number(levelNumber);

  if (!toDoId || parsedLevelNumber == null) {
    return res.status(400).json({
      success: false,
      message: "ToDo ID and level number are required",
    });
  }

  const toDo = await ToDo.findById(toDoId);
  if (!toDo) {
    return res.status(404).json({
      success: false,
      message: "ToDo not found",
    });
  }

  if (toDo.levelNumber !== parsedLevelNumber) {
    return res.status(400).json({
      success: false,
      message: "Level number mismatch",
    });
  }

  // Check for existing submission
  const existing = await ToDoSubmission.findOne({
    userId: req.user._id,
    toDoId,
  });

  if (existing) {
    if (existing.status === "in_progress") {
      return res.status(400).json({
        success: false,
        message: "You have already started this task",
        data: existing,
      });
    } else if (existing.status === "submitted") {
      return res.status(400).json({
        success: false,
        message: "You have already submitted this task",
        data: existing,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: `You cannot start this task again. It was already ${existing.status}`,
        data: existing,
      });
    }
  }

  // Create new submission
  const newSubmission = await ToDoSubmission.create({
    userId: req.user._id,
    toDoId,
    levelNumber: parsedLevelNumber,
    startedAt: new Date(),
    status: "in_progress",
  });

  const populated = await ToDoSubmission.findById(newSubmission._id)
    .populate("toDoId", "title levelNumber")
    .populate("userId", "name email");

  return res.status(201).json({
    success: true,
    message: "ToDo task started successfully",
    data: populated,
  });
});
