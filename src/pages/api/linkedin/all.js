import { catchAsync } from "@/lib/middlewares/catchAsync";
import dbConnect from "@/lib/dbConnect";
import { LinkedinSubmission } from "@/lib/models/LinkedinSubmission";

export default catchAsync(async (req, res) => {
  await dbConnect();

  const submissions = await LinkedinSubmission.find({}).sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    data: submissions,
  });
});
