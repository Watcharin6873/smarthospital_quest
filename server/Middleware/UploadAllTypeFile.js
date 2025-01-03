const { json } = require('body-parser')
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './file-uploads')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now()
        cb(null, 'SmartHosp_' + uniqueSuffix + '_' + file.originalname)
    }
})

exports.uploadAllTypeFile = multer({
    storage: storage,
    fileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname);
        if (ext !== '.png' && ext !== '.jpg' && ext !== '.PNG' && ext !== '.jpeg' && ext !== '.pdf') {
            return callback(new Error('ต้องเป็นไฟล์นามสกุล .png หรือ .jpg หรือ .pdf เท่านั้น!!'));
        }
        callback(null, true);
    },
}).single('file_name')

// Check file type
function checkFileType(file, cb) {
    const filetypes = /jpg|jpeg|png|pdf/;
    const extname = filetypes.test(path.extname(file.originalname));
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        //   return cb('ต้องเป็นไฟล์ PDF เท่านั้น!!');
        return cb(null, false);
    }
}
