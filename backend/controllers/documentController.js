const Document = require("../models/document");
const mongoose = require("mongoose");

//TODO: Refine in the files handling stage.

//* Managers

//Upload a new document
//TODO: get hoa id from auth instead of body
async function uploadDocument(req, res) {
  const { fileName, fileDescription, file } = req.body;

  // get hoa id from user auth
  const { hoaID } = req.body; //change to auth id
  // check if id is a valid mongoose id
  if (!mongoose.Types.ObjectId.isValid(hoaID)) {
    return res.status(404).json({ error: "HOA Not Found" });
  }

  try {
    const document = await Document.create({
      HOA: hoaID,
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
//TODO: get hoa id from auth instead of body
async function getDocuments(req, res) {
  // get hoa id from user auth
  const { hoaID } = req.body; //change to auth id
  // check if id is a valid mongoose id
  if (!mongoose.Types.ObjectId.isValid(hoaID)) {
    return res.status(404).json({ error: "HOA Not Found" });
  }

  const documents = await Document.find({ HOA: hoaID }).sort({ createdAt: -1 });
  if (!documents) {
    return res.status(404).json({ error: "No Documents Found" });
  }
  res.status(200).json(documents);
}

//Edit an existing document by _id
async function editDocument(req, res) {
  const { id } = req.params;
  // check if bill id is a valid mongoose id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Document Not Found" });
  }

  const { fileName, fileDescription, file } = req.body;

  const document = await Document.findByIdAndUpdate(
    id,
    { fileName, fileDescription, file },
    { new: true }
  );
  if (!document) {
    return res.status(404).json({ error: "Document Not Found" });
  }
  res.status(200).json(document);
}

//Delete an existing document by _id
async function deleteDocument(req, res) {
  const { id } = req.params;
  // check if bill id is a valid mongoose id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Document Not Found" });
  }

  const document = await Document.findByIdAndDelete(id);
  if (!document) {
    return res.status(404).json({ error: "Document Not Found" });
  }
  res.status(200).json(document);
}

//* Tenants

//Get all documents of a user
//TODO: get hoa id from auth instead of body
async function getUserDocuments(req, res) {
  // get hoa id from user auth
  const { hoaID } = req.body; //change to auth id
  //   check if id is a valid mongoose id
  if (!mongoose.Types.ObjectId.isValid(hoaID)) {
    return res.status(404).json({ error: "HOA Not Found" });
  }

  const documents = await Document.find({ hoaID }).sort({ createdAt: -1 });
  if (!documents) {
    return res.status(404).json({ error: "No Documents Found" });
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
