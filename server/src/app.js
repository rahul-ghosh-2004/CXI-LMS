import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    methods: ["POST", "GET", "PUT", "PATCH", "DELETE"]
}))
app.use(express.json({
    limit: "100kb"
}))
app.use(express.urlencoded({
    limit: "100kb",
    extended: true
}))
app.use(express.static("public"))
app.use(cookieParser())


import userRoute from "./routes/user.route.js"

app.use("/api/v1/cxi/user", userRoute)

export default app