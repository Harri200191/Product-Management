const multer = require("multer");

// Define file storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
      cb(null, Date().toISOString().replace(/:/g, "-") + file.originalname);
    }
});

// Specify file format that can be saved 
function fileFilter (req, file, cb) {
    if(file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg"){
        cb(null, true);
    }
    else{
        cb(null, false)
    };
};
  
const upload = multer({ storage: storage, fileFilter: fileFilter });
module.exports = upload;



