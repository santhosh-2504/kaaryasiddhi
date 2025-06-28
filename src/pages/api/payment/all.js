import { catchAsync } from "@/lib/middlewares/catchAsync";
import dbConnect from "@/lib/dbConnect";
import { Payment } from "@/lib/models/Payment";

export default catchAsync(async (req, res) => {
  await dbConnect();

  const payments = await Payment.find({}).sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    data: payments,
  });
});
