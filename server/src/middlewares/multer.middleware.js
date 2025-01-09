import multer from "multer"

const storage = multer.diskStorage({
    destination: (__, __, cb) => {
        cb(null, "public/temp")
    },
    filename: (__, file, cb) => {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage })

export default upload