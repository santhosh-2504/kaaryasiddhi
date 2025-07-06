import { catchAsync } from "@/lib/middlewares/catchAsync";
import dbConnect from "@/lib/dbConnect";
import { ToDo } from "@/lib/models/ToDo";

export default catchAsync(async (req, res) => {
  await dbConnect();

  const levelNumber = parseInt(req.query.levelNumber);

  if (isNaN(levelNumber)) {
    return res.status(400).json({
      success: false,
      message: "Invalid level number",
    });
  }

  const tasks = await ToDo.find({ levelNumber }).sort({ createdAt: 1 });

  res.status(200).json({
    success: true,
    data: tasks,
  });
});
