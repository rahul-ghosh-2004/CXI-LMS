import AsyncHandler from "../utils/AsyncHandler.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import JWT from "jsonwebtoken"
import User from "../models/user.model.js";

const authHandler = AsyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")

        if (!token) {
            return res
                .status(403)
                .json(
                    new ErrorHandler(
                        403,
                        "Access Denied. Please authenticate again."
                    )
                )
        }

        const decodedToken = JWT.verify(token, process.env.ACCESS_TOKEN_SECRET)

        const user = await User.findById(decodedToken._id).select("-password")

        if (!user) {
            return res
                .status(404)
                .json(
                    new ErrorHandler(
                        404,
                        "Access denied. Invalid access token."
                    )
                )
        }

        req.user = user
        next()
    } catch (error) {
        return res
            .status(500)
            .json(
                new ErrorHandler(
                    500,
                    `Internal server error :: ${error?.message}`
                )
            )
    }
})

export default authHandler