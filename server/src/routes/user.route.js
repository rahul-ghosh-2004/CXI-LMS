import {Router} from "express"
import {
    register,
    login,
    getCurrentUser,
    logout
} from "../controllers/user.controller.js"
import authHandler from "../controllers/auth.middleware.js"

const router = Router()

router.route("/register").post(register)
router.route("/login").post(login)
router.route("/fetch-current-user").get(authHandler, getCurrentUser)
router.route("/logout").get(authHandler, logout)

export default router