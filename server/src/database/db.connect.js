import mongoose from "mongoose"
import DBName from "../constant.js"

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DBName}`)
        console.log(`DB host :: ${connectionInstance.connection.host}`)
    } catch (error) {
        console.error(`MongoDB connection error :: error message :: ${error?.message}`)
        process.exit(1)
    }
}

export default connectDB