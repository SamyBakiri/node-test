const multer = require('multer');
const path = require('path');
const fs = require('fs');


const uploadDir = path.join(__dirname, '../uploads');
if(!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// configure storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});

// filter by type

const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|pdf/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (extname && mimetype) cb(null, true);
    else cb(new Error('File type not allowed'));
};


const upload = multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } }); // 5MB max
module.exports = upload;