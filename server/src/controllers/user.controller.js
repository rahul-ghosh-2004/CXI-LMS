import AsyncHandler from "../utils/AsyncHandler.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import ResponseHandler from "../utils/ResponseHandler.js";
import User from "../models/user.model.js";


const register = AsyncHandler(async (req, res) => {
    try {
        const { name, email, password } = req.body

        if (!name || !email || !password) {
            return res
                .status(404)
                .json(
                    new ErrorHandler(
                        400,
                        "All fields are required"
                    )
                )
        }

        if (name?.trim() === "") {
            return res
                .status(404)
                .json(
                    new ErrorHandler(
                        400,
                        "Name should not be empty"
                    )
                )
        }

        if (!/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(email?.trim()?.toLowerCase())) {
            return res
                .status(404)
                .json(
                    new ErrorHandler(
                        400,
                        "Invalid E-Mail format"
                    )
                )
        }

        if (password?.trim() === "") {
            return res
                .status(404)
                .json(
                    new ErrorHandler(
                        400,
                        "Password should not be empty"
                    )
                )
        }

        if (password?.length < 8 || password?.length > 16) {
            return res
                .status(404)
                .json(
                    new ErrorHandler(
                        400,
                        "Password should be between 8 to 16 characters long"
                    )
                )
        }

        const existedUser = await User.findOne({ email: email?.trim() }).select("-password")

        if (existedUser) {
            return res
                .status(404)
                .json(
                    new ErrorHandler(
                        400,
                        "User with this email already exists"
                    )
                )
        }

        const userDocument = await User.create({
            name: name?.trim()?.toUpperCase(),
            email: email?.trim()?.toUpperCase(),
            password: password?.trim()
        })

        const isCreatedUser = await User.findById(userDocument._id).select("-password")

        if (!isCreatedUser) {
            return res
                .status(500)
                .json(
                    new ErrorHandler(
                        500,
                        "Failed to create user document"
                    )
                )
        }

        return res
            .status(201)
            .json(
                new ResponseHandler(
                    201,
                    isCreatedUser,
                    "User created successfully"
                )
            )
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

const login = AsyncHandler(async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res
                .status(404)
                .json(
                    new ErrorHandler(
                        400,
                        "All fields are required"
                    )
                )
        }

        if (!/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(email?.trim()?.toLowerCase())) {
            return res
                .status(404)
                .json(
                    new ErrorHandler(
                        400,
                        "Invalid E-Mail format"
                    )
                )
        }

        if (password?.trim() === "") {
            return res
                .status(404)
                .json(
                    new ErrorHandler(
                        400,
                        "Password should not be empty"
                    )
                )
        }

        if (password?.length < 8 || password?.length > 16) {
            return res
                .status(404)
                .json(
                    new ErrorHandler(
                        400,
                        "Password should be between 8 to 16 characters long"
                    )
                )
        }

        const isExistedUser = await User.findOne({ email: email?.trim()?.toUpperCase() })

        if (!isExistedUser) {
            return res
                .status(404)
                .json(
                    new ErrorHandler(
                        404,
                        "User not found"
                    )
                )
        }

        const isCorrectPassword = await isExistedUser.verifyPassword(password)

        if (!isCorrectPassword) {
            return res
                .status(404)
                .json(
                    new ErrorHandler(
                        404,
                        "Incorrect password"
                    )
                )
        }

        const accessToken = isExistedUser.generateAccessToken()

        const options = {
            httpOnly: true,
            secure: false,
            SameSite: "None"
        }

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .json(
                new ResponseHandler(
                    200,
                    {
                        name: isExistedUser.name,
                        email: isExistedUser.email,
                        profileImage: isExistedUser.photo,
                        enrolledCourses: isExistedUser.enrolledCourses,
                        role: isExistedUser.role
                    },
                    "User logged in successfully"
                )
            )
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

const getCurrentUser = AsyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req?.user?._id).select("-password")

        if (!user) {
            return res
                .status(404)
                .json(
                    new ErrorHandler(
                        404,
                        "User not found"
                    )
                )
        }

        return res
            .status(200)
            .json(
                new ResponseHandler(
                    200,
                    user,
                    "User retrieved successfully"
                )
            )
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

const logout = AsyncHandler(async (req, res) => {
    try {
        const options = {
            httpOnly: true,
            Secure: false,
            SameSite: "None"
        }

        return res
        .status(200)
        .clearCookie("accessToken", options)
        .json(
            new ResponseHandler(
                200,
                {},
                "User logged out successfully"
            )
        )
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

export {
    register,
    login,
    getCurrentUser,
    logout
}