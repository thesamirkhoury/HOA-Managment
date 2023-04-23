const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // add document uploaded files to uploads/documents file
    if (req.originalUrl === "/api/managers/documents") {
      cb(null, "uploads/documents");
    }
  },
});

const upload = multer({
  storage,
});

module.exports = upload;
