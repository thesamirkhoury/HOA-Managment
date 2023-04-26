const MaintenanceRequest = require("../models/maintenance");
const { sendMaintenanceStatus, forwardToSupplier } = require("../util/email");
const { compressImage } = require("../middleware/upload");

//* Managers

//Get all maintenance requests
async function getRequests(req, res) {
  // hoa id from auth
  const hoa_id = req.user._id;

  const requests = await MaintenanceRequest.find({ hoa_id });
  if (!requests) {
    return res.status(404).json({ error: "לא נמצאו קריאות שירות." });
  }
  res.status(200).json(requests);
}

//Change the status to a maintenance requests by _id
async function changeStatus(req, res) {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const request = await MaintenanceRequest.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    if (!request) {
      return res.status(404).json({ error: "לא נמצאו קריאות שירות." });
    }
    await sendMaintenanceStatus(request.tenant_id);
    res.status(200).json(request);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function forwardRequest(req, res) {
  const { id } = req.params;
  const { supplierEmail } = req.body;

  try {
    const request = await MaintenanceRequest.findById(id);
    if (!request) {
      return res.status(404).json({ error: "לא נמצת קריאת שירות." });
    }
    await forwardToSupplier(supplierEmail, request.description);
    res.status(200).json({ message: "נשלח מייל לספק בהצלחה" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
//* Tenants

//Create a new maintenance request
async function createRequest(req, res) {
  const { subject, description } = req.body;
  let picture = req.file;
  //Validation
  if (!subject || !description) {
    return res.status(400).json({ error: "אחד או יותר מהפרטים חסרים." });
  }

  // hoa id from auth
  const hoa_id = req.user.hoa_id;
  // tenant id from auth
  const tenant_id = req.user._id;

  //if the request has a picture, compress it and store the pathname
  if (picture) {
    picture = picture.filename;
    await compressImage(req.file.path);
  }

  try {
    const request = await MaintenanceRequest.create({
      hoa_id,
      tenant_id,
      subject,
      description,
      status: "פתוח",
      picturePath: picture,
    });
    res.status(200).json(request);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

//Get all requests for a user
async function getUserRequests(req, res) {
  // hoa id from auth
  const hoa_id = req.user.hoa_id;
  // tenant id from auth
  const tenant_id = req.user._id;

  const requests = await MaintenanceRequest.find({
    hoa_id,
    tenant_id,
  }).sort({ createdAt: -1 });

  if (!requests) {
    return res.status(404).json({ error: "לא נמצאו קריאות שירות." });
  }
  res.status(200).json(requests);
}

//* General
//Send the image ready to be viewed
async function viewImage(req, res) {
  const { path } = req.params;
  res.sendFile(path, { root: "uploads/requests/" });
}

module.exports = {
  getRequests,
  changeStatus,
  forwardRequest,
  createRequest,
  getUserRequests,
  viewImage,
};
