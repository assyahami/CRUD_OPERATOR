const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname)
    }
})


const upload = multer({
    storage,
    fileFilter: function (req, file, cb) {
        if (file.mimetype.startsWith("image/")) {
            cb(null, true)
        } else {
            cb(new Error("Invalid file format please upload image format eg:png,jpeg,jpg"))
        }
    },
    limits: { fileSize: 200 * 1024 }
})
const uploadErrorHandler = (err, req, res, next) => {

    if (err instanceof multer.MulterError) {
       return res.status(400).json({ message: 'File size exceeds limit upload below 200kb', status: false });
    }
    next()
}
module.exports = {
    upload,
    uploadErrorHandler
}