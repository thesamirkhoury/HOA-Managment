const multer = require("multer");
const fs = require("fs");
const sharp = require("sharp");

// paths object
const paths = {
  documentsPath: "uploads/documents",
  maintenancePath: "uploads/requests",
};

// ensure that the upload folders exists in the file system
function ensureUploadPaths() {
  for (const item in paths) {
    fs.mkdir(paths[item], { recursive: true }, function (error) {
      if (error)
        return console.error(`error creating upload paths - err msg: ${error}`);
    });
  }
}

// compress the image using sharp
async function compressImage(path) {
  let image = sharp(path);
  // get image type
  const meta = await image.metadata();
  const { format } = meta;
  // compression configuration
  const config = {
    jpeg: { quality: 80 },
    png: { quality: 80 },
  };

  // compress and resize image
  let buffer = await image[format](config[format])
    .resize(2000, 2000, {
      fit: sharp.fit.inside,
      withoutEnlargement: true,
    })
    .toBuffer();

  // replace current file with a compressed file
  return sharp(buffer).toFile(path);
}

// store files in sub folders based on the request
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // add document uploaded files to uploads/documents file
    if (req.originalUrl === "/api/managers/documents") {
      cb(null, paths.documentsPath);
    } else if (req.originalUrl === "/api/tenants/maintenance") {
      cb(null, paths.maintenancePath);
    } else {
      cb("Unsupported upload path", null);
    }
  },
});

// filter for allowed files to be uploaded
const fileFilter = (req, file, cb) => {
  if (req.originalUrl === "/api/tenants/maintenance") {
    // for maintenance requests images, only allow jpeg and png file types
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
    } else {
      cb(null, false);
    }
  } else if (req.originalUrl === "/api/managers/documents") {
    // allow all file types for the documents upload
    cb(null, true);
  } else {
    //if a wrong path is passed do not accept upload
    cb(null, false);
  }
};

const upload = multer({
  storage,
  fileFilter,
});

module.exports = { upload, ensureUploadPaths, compressImage };
