import { catchAsync } from "@/lib/middlewares/catchAsync";
import dbConnect from "@/lib/dbConnect";
import { User } from "@/lib/models/User";
import { Submission } from "@/lib/models/Submission";
import { Task } from "@/lib/models/Task";
import jwt from "jsonwebtoken";

if (!process.env.JWT_SECRET_KEY) {
  throw new Error("JWT_SECRET_KEY must be defined in environment variables");
}

export default catchAsync(async (req, res) => {
  if (req.method !== "GET") {
    return res
      .status(405)
      .json({ success: false, message: "Method not allowed" });
  }

  await dbConnect();

  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ success: false, message: "Please login" });
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET_KEY, {
      algorithms: ["HS256"],
    });
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }

  const user = await User.findById(decoded._id).select("-password");
  if (!user || user.role !== "admin") {
    return res.status(403).json({ success: false, message: "Access denied" });
  }

  // Extract query parameters with defaults
  const days = parseInt(req.query.days) || 7;
  const searchName = req.query.search ? req.query.search.trim() : "";
  const levelFilter = req.query.level ? parseInt(req.query.level) : null;

  // Validate days parameter (only allow specific values)
  const allowedDays = [1, 3, 5, 7, 15, 30];
  const validDays = allowedDays.includes(days) ? days : 7;

  const sinceDate = new Date(Date.now() - validDays * 24 * 60 * 60 * 1000);

  // Build user query with search and level filters
  let userQuery = {};

  // Add name search filter (case-insensitive)
  if (searchName) {
    userQuery.name = { $regex: searchName, $options: "i" };
  }

  // Add level filter
  if (levelFilter !== null && levelFilter >= 0) {
    userQuery.currentLevel = levelFilter;
  }

  // Fetch filtered users
  const users = await User.find(userQuery).select(
    "name currentLevel streak isStreakFrozen",
  );

  // Get user IDs for submission filtering
  const userIds = users.map((u) => u._id);

  // Fetch submissions in last X days for filtered users only
  const recentSubs = await Submission.find({
    userId: { $in: userIds },
    submittedAt: { $gte: sinceDate },
  })
    .populate("taskId", "type") // Get task type for filtering
    .select("userId taskId score submittedAt");

  // Group submissions per user
  const userMetrics = {};

  for (const sub of recentSubs) {
    const uid = sub.userId.toString();
    const type = sub.taskId?.type;

    if (!type) continue;

    if (!userMetrics[uid]) {
      userMetrics[uid] = {
        linkedinCount: 0,
        githubCount: 0,
        linkedinTotalScore: 0,
        githubTotalScore: 0,
        linkedinScoreCount: 0,
        githubScoreCount: 0,
        lastSubmission: sub.submittedAt,
      };
    }

    const metric = userMetrics[uid];

    if (type === "linkedin") {
      metric.linkedinCount += 1;
      if (typeof sub.score === "number") {
        metric.linkedinTotalScore += sub.score;
        metric.linkedinScoreCount += 1;
      }
    } else if (type === "github") {
      metric.githubCount += 1;
      if (typeof sub.score === "number") {
        metric.githubTotalScore += sub.score;
        metric.githubScoreCount += 1;
      }
    }

    if (!metric.lastSubmission || sub.submittedAt > metric.lastSubmission) {
      metric.lastSubmission = sub.submittedAt;
    }
  }

  // Final response array
  const dashboard = users.map((u) => {
    const uid = u._id.toString();
    const m = userMetrics[uid] || {};

    return {
      userId: uid,
      name: u.name,
      currentLevel: u.currentLevel,
      streak: u.streak,
      isStreakFrozen: u.isStreakFrozen,
      linkedinTasksCount: m.linkedinCount || 0,
      githubTasksCount: m.githubCount || 0,
      avgLinkedinScore: m.linkedinScoreCount
        ? (m.linkedinTotalScore / m.linkedinScoreCount).toFixed(2)
        : null,
      avgGithubScore: m.githubScoreCount
        ? (m.githubTotalScore / m.githubScoreCount).toFixed(2)
        : null,
      lastSubmission: m.lastSubmission || null,
    };
  });

  // Add metadata about applied filters
  const metadata = {
    totalUsers: dashboard.length,
    appliedFilters: {
      searchName: searchName || null,
      levelFilter: levelFilter !== null ? levelFilter : null,
      daysBack: validDays,
    },
    availableFilters: {
      allowedDays: allowedDays,
    },
  };

  res.status(200).json({
    success: true,
    data: dashboard,
    metadata,
  });
});
