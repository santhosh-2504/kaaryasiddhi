import { catchAsync } from "@/lib/middlewares/catchAsync";
import dbConnect from "@/lib/dbConnect";
import { Resource } from "@/lib/models/Resource";

export default catchAsync(async (req, res) => {
  await dbConnect();

  const resources = await Resource.find({}).sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    data: resources,
  });
});
