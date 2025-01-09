import mongoose, {Schema} from "mongoose"
import bcrypt from "bcrypt"
import JWT from "jsonwebtoken"

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        index: true,
        uppercase: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        index: true,
        uppercase: true
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
        maxLength: 16,
        trim: true
    },
    role: {
        type: String,
        enum: ["STUDENT", "INSTRUCTOR", "ADMIN"],
        default: "STUDENT"
    },
    photo: {
        type: String, // cloudinary URL
        default: ""
    },
    enrolledCourses: [
        {
            type: Schema.Types.ObjectId,
            ref: "Course"
        }
    ]
}, { timestamps: true })

userSchema.pre("save", async function(next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10)
    } else {
        next()
    }
})

userSchema.methods.verifyPassword = async function(password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function() {
    return JWT.sign(
        {
            _id: this._id,
            email: this.email,
            name: this.name
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

const User = mongoose.model("User", userSchema)

export default User