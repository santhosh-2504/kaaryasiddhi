import { catchAsync } from "@/lib/middlewares/catchAsync";
import dbConnect from "@/lib/dbConnect";
import { Level } from "@/lib/models/Level";

export default catchAsync(async (req, res) => {
  await dbConnect();

  const levels = await Level.find({}).sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    data: levels,
  });
});
