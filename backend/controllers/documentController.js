const Document = require("../models/document");
const mongoose = require("mongoose");

//TODO: Refine in the files handling stage.

//* Managers

//Upload a new document
async function uploadDocument(req, res) {
  const { fileName, fileDescription, file } = req.body;
  //Validation
  //TODO: refine in file handling
  if (!fileName || !fileDescription) {
    return res.status(400).json({ error: "אחד או יותר מהפרטים חסרים." });
  }

  // hoa id from auth
  const hoa_id = req.user._id;

  try {
    const document = await Document.create({
      hoa_id,
      fileName,
      fileDescription,
      file,
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
  // check if bill id is a valid mongoose id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "קובץ זה אינו קמיית במערכת." });
  }

  const { fileName, fileDescription, file } = req.body;

  const document = await Document.findByIdAndUpdate(
    id,
    { fileName, fileDescription, file },
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
  res.status(200).json(document);
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

module.exports = {
  uploadDocument,
  getDocuments,
  editDocument,
  deleteDocument,
  getUserDocuments,
};
