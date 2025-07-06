import { catchAsync } from "@/lib/middlewares/catchAsync";
import dbConnect from "@/lib/dbConnect";
import { Prompt } from "@/lib/models/Prompt";

export default catchAsync(async (req, res) => {
  await dbConnect();

  const prompts = await Prompt.find({}).sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    data: prompts,
  });
});
