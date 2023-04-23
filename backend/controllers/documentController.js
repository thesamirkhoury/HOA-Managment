const Document = require("../models/document");
const mongoose = require("mongoose");
const fs = require("fs");

//* Managers

//Upload a new document
async function uploadDocument(req, res) {
  let { fileName, fileDescription } = req.body;
  const file = req.file;
  //Validation
  if (!fileName || !fileDescription || !file) {
    return res.status(400).json({ error: "אחד או יותר מהפרטים חסרים." });
  }

  // hoa id from auth
  const hoa_id = req.user._id;

  //check if filename has an extension, if not append the correct one.
  if (!fileName.includes(".")) {
    let extension = file.originalname.split(".").pop();
    fileName = `${fileName}.${extension}`;
  }

  try {
    const document = await Document.create({
      hoa_id,
      fileName,
      fileDescription,
      filePath: file.filename,
    });
    res.status(200).json(document);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

//Get all documents
async function getDocuments(req, res) {
  // hoa id from auth
  const hoa_id = req.user._id;

  const documents = await Document.find({ hoa_id }).sort({ createdAt: -1 });
  if (!documents) {
    return res.status(404).json({ error: "לא נמצאו קבצים" });
  }
  res.status(200).json(documents);
}

//Edit an existing document by _id
async function editDocument(req, res) {
  const { id } = req.params;
  let { fileName, fileDescription, extension } = req.body;

  //check if filename has an extension, if not append the correct one.
  if (!fileName.includes(".")) {
    fileName = `${fileName}.${extension}`;
  }

  const document = await Document.findByIdAndUpdate(
    id,
    { fileName, fileDescription },
    { new: true }
  );
  if (!document) {
    return res.status(404).json({ error: "קובץ זה אינו קמיית במערכת." });
  }
  res.status(200).json(document);
}

//Delete an existing document by _id
async function deleteDocument(req, res) {
  const { id } = req.params;
  // check if bill id is a valid mongoose id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "קובץ זה אינו קמיית במערכת." });
  }

  const document = await Document.findByIdAndDelete(id);
  if (!document) {
    return res.status(404).json({ error: "קובץ זה אינו קמיית במערכת." });
  }
  try {
    fs.unlinkSync(`uploads/${document.filePath}`);
    res.status(200).json(document);
  } catch (error) {
    // if file is unsuccessfully deleted
    res.status(400).json({ error: "File unlinked." });
  }
}

//* Tenants

//Get all documents of a user
async function getUserDocuments(req, res) {
  // hoa id from auth
  const hoa_id = req.user.hoa_id;

  const documents = await Document.find({ hoa_id }).sort({ createdAt: -1 });
  if (!documents) {
    return res.status(404).json({ error: "לא נמצאו קבצים" });
  }
  res.status(200).json(documents);
}

//* General
//Send back file for download by id
async function downloadDocument(req, res) {
  const { id } = req.params;
  const document = await Document.findById(id);
  if (!document) {
    return res.status(404).json({ error: "קובץ זה אינו קמיית במערכת" });
  }
  res.download(`uploads/documents/${document.filePath}`, document.fileName);
}

module.exports = {
  uploadDocument,
  getDocuments,
  editDocument,
  deleteDocument,
  getUserDocuments,
  downloadDocument,
};
