import { User } from "@/lib/models/User.js";
import { catchAsync } from "@/lib/middlewares/catchAsync.js";
import ErrorHandler from "@/lib/middlewares/error.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = catchAsync(async(req, res) => {
    const token = req.cookies.token;

    if(!token) {
        throw new ErrorHandler("Please login to access this resource", 401);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY, {
        algorithms: ['HS256']
    });

    const user = await User.findById(decoded._id);

    if (!user) {
        throw new ErrorHandler("User not found", 404);
    }

    req.user = user;
    // Do not call next(); just return and let the handler continue
});