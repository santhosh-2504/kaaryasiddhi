import dbConnect from "@/lib/dbConnect";
import { Payment } from "@/lib/models/Payment";
import { User } from "@/lib/models/User";
import jwt from "jsonwebtoken";
import { catchAsync } from "@/lib/middlewares/catchAsync";

export default catchAsync(async (req, res) => {
  if (req.method !== "GET") {
    return res
      .status(405)
      .json({ success: false, message: "Method not allowed" });
  }

  await dbConnect();

  const token = req.cookies.token;
  if (!token) {
    return res
      .status(401)
      .json({
        success: false,
        message: "Please login to access this resource",
      });
  }

  let user;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY, {
      algorithms: ["HS256"],
    });
    user = await User.findById(decoded._id);

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User not found" });
    }

    if (user.role !== "admin") {
      return res
        .status(403)
        .json({ success: false, message: "Access denied. Admins only." });
    }
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid or expired token" });
  }

  // Fetch all pending payments
  try {
    const pendingPayments = await Payment.find({ verified: false }).sort({
      paidAt: -1,
    });

    return res.status(200).json({
      success: true,
      payments: pendingPayments,
    });
  } catch (err) {
    console.error("Error fetching pending payments:", err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
});
