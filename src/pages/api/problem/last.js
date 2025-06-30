import { catchAsync } from "@/lib/middlewares/catchAsync";
import dbConnect from "@/lib/dbConnect";
import { Problem } from "@/lib/models/Problem";

export default catchAsync(async (req, res) => {
  await dbConnect();

  const problem = await Problem.find({}).sort({ createdAt: -1 }).limit(1);

  res.status(200).json({
    success: true,
    data: problem[0],
  });
});
