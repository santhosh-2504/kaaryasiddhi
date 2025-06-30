import dbConnect from "@/lib/dbConnect";
import { Payment } from "@/lib/models/Payment";
import { User } from "@/lib/models/User";
import jwt from "jsonwebtoken";
import { catchAsync } from "@/lib/middlewares/catchAsync";

export default catchAsync(async (req, res) => {
  if (req.method !== "DELETE") {
    return res
      .status(405)
      .json({ success: false, message: "Method not allowed" });
  }

  await dbConnect();

  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Please login to access this resource",
    });
  }

  let adminUser;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY, {
      algorithms: ["HS256"],
    });
    adminUser = await User.findById(decoded._id);
    if (!adminUser || adminUser.role !== "admin") {
      return res.status(403).json({ success: false, message: "Admins only" });
    }
  } catch (err) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid or expired token" });
  }

  const { paymentId } = req.body;
  if (!paymentId) {
    return res
      .status(400)
      .json({ success: false, message: "paymentId is required" });
  }

  const payment = await Payment.findById(paymentId);
  if (!payment || payment.verified) {
    return res
      .status(404)
      .json({ success: false, message: "Pending payment not found" });
  }

  await Payment.findByIdAndDelete(paymentId);

  res.status(200).json({
    success: true,
    message: "Payment rejected and deleted successfully",
  });
});
