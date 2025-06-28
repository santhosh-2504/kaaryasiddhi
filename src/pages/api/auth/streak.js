import dbConnect from "@/lib/dbConnect";
import { User } from "@/lib/models/User";
import { Streak } from "@/lib/models/Streak";
import jwt from "jsonwebtoken";
import { catchAsync } from "@/lib/middlewares/catchAsync";

if (!process.env.JWT_SECRET_KEY) {
  throw new Error("JWT_SECRET_KEY must be defined in environment variables");
}

const getStartOfDay = (date = new Date()) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
};

export default catchAsync(async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  await dbConnect();

  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ success: false, message: "Please login to continue" });
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET_KEY, {
      algorithms: ["HS256"],
    });
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }

  const user = await User.findById(decoded._id);
  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  const today = getStartOfDay();
  const yesterday = getStartOfDay(new Date(today.getTime() - 86400000)); // -1 day

  const alreadyLogged = await Streak.findOne({ user: user._id, date: today });

  if (alreadyLogged) {
    return res.status(200).json({
      success: false,
      message: "Streak already counted for today",
      streak: user.streak,
    });
  }

  const lastLog = await Streak.findOne({ user: user._id }).sort({ date: -1 });

  if (lastLog) {
    const lastDate = getStartOfDay(lastLog.date);
    const diff = (today - lastDate) / (1000 * 60 * 60 * 24); // in days

    if (diff === 1) {
      user.streak += 1;
    } else {
      user.streak = 1;
    }
  } else {
    user.streak = 1; // first ever
  }

  await user.save();
  await Streak.create({ user: user._id, date: today });

  return res.status(200).json({
    success: true,
    message: "Streak incremented",
    streak: user.streak,
  });
});
