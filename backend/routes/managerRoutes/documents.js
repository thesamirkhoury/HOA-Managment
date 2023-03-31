const express = require("express");
//controller functions
const {
  uploadDocument,
  getDocuments,
  editDocument,
  deleteDocument,
} = require("../../controllers/documentController");
//auth middleware
const requireAuthManager = require("../../middleware/requireAuthManager");

const router = express.Router();

//use auth middleware to protect api endpoints
router.use(requireAuthManager);

//Upload a new document
router.post("/", uploadDocument);

//Get all documents
router.get("/", getDocuments);

//Edit an existing document by _id
router.patch("/:id", editDocument);

//Delete an existing document by _id
router.delete("/:id", deleteDocument);

module.exports = router;
