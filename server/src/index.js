import dotenv from "dotenv"
import connectDB from "./database/db.connect.js"
import app from "./app.js"

dotenv.config({ path: "./.env" })

connectDB()
.then(() => {
    console.log(`DB Connected successfully ...`)

    app.listen(process.env.PORT || 4400, () => {
        console.log(`Server is listining on port :: ${process.env.PORT || 4400}`)
        console.log(`Server address :: http://localhost:${process.env.PORT || 4400}`)
    })
})
.catch(error => {
    console.error(`MONGODB_CONNECTION_ERROR :: ${error?.message}`)
    process.exit(1)
})