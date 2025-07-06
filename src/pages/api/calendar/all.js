import { catchAsync } from "@/lib/middlewares/catchAsync";
import dbConnect from "@/lib/dbConnect";
import { MonthCalendar } from "@/lib/models/MonthCalendar";

export default catchAsync(async (req, res) => {
  await dbConnect();

  const months = await MonthCalendar.find({}).sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    data: months,
  });
});
