import dbConnect from "@/lib/dbConnect";
import { Payment } from "@/lib/models/Payment";
import { User } from "@/lib/models/User";
import jwt from "jsonwebtoken";
import { catchAsync } from "@/lib/middlewares/catchAsync";

export default catchAsync(async (req, res) => {
  if (req.method !== "POST") {
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
  if (!payment) {
    return res
      .status(404)
      .json({ success: false, message: "Payment not found" });
  }

  if (payment.verified) {
    return res
      .status(400)
      .json({ success: false, message: "Payment already verified" });
  }

  if (payment.type === "subscription") {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 30);

    payment.verified = true;
    payment.subscriptionExpiry = expiryDate;
    await payment.save();

    const userId = payment.userId._id?.toString() || payment.userId.toString();

    await User.updateOne(
      { _id: userId },
      {
        $set: {
          isSubscribed: true,
          subscriptionExpiry: expiryDate,
        },
      },
    );
  } else if (payment.type === "due") {
    payment.verified = true;
    await payment.save();
    // Do not touch user fields
  } else {
    return res
      .status(400)
      .json({ success: false, message: "Invalid payment type" });
  }

  res.status(200).json({
    success: true,
    message: "Payment approved successfully",
  });
});
