const express = require("express");
//controller functions
const {
  uploadDocument,
  getDocuments,
  editDocument,
  deleteDocument,
  downloadDocument,
} = require("../../controllers/documentController");
//middleware
const requireAuthManager = require("../../middleware/requireAuthManager");
const upload = require("../../middleware/upload");

const router = express.Router();

//use auth middleware to protect api endpoints
router.use(requireAuthManager);

//Upload a new document
router.post("/", upload.single("document"), uploadDocument);

//Get all documents
router.get("/", getDocuments);

//Edit an existing document by _id
router.patch("/:id", editDocument);

//Delete an existing document by _id
router.delete("/:id", deleteDocument);

router.get("/download/:id", downloadDocument);

module.exports = router;
