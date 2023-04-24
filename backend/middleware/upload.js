const multer = require("multer");
const fs = require("fs");

const paths = {
  documentsPath: "uploads/documents",
};

function ensureUploadPaths() {
  for (const item in paths) {
    fs.mkdir(paths[item], { recursive: true }, function (error) {
      if (error)
        return console.error(`error creating upload paths - err msg: ${error}`);
    });
  }
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // add document uploaded files to uploads/documents file
    if (req.originalUrl === "/api/managers/documents") {
      cb(null, paths.documentsPath);
    }
    else {
      cb("Unsupported upload path", null);
    }
  },
});

const upload = multer({
  storage,
});

module.exports = { upload, ensureUploadPaths };
