const Announcement = require("../models/announcements");
const Tenant = require("../models/tenants");
const mongoose = require("mongoose");

//* Managers

//Create a new announcement
//TODO: get hoa id from auth instead of body
async function createAnnouncement(req, res) {
  const { title, body, buildingNumber } = req.body;
  // get hoa id from user auth
  const { hoaID } = req.body; //change to auth id
  // check if id is a valid mongoose id
  if (!mongoose.Types.ObjectId.isValid(hoaID)) {
    return res.status(404).json({ error: "HOA Not Found" });
  }

  try {
    const announcement = await Announcement.create({
      HOA: hoaID,
      title,
      body,
      buildingNumber,
    });
    res.status(200).json(announcement);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

//Get all announcements
//TODO: get hoa id from auth instead of body
async function getAnnouncements(req, res) {
  // get hoa id from user auth
  const { hoaID } = req.body; //change to auth id
  // check if id is a valid mongoose id
  if (!mongoose.Types.ObjectId.isValid(hoaID)) {
    return res.status(404).json({ error: "HOA Not Found" });
  }

  const announcements = await Announcement.find({ HOA: hoaID });

  if (!announcements) {
    return res.status(404).json({ error: "No Announcements Found" });
  }
  res.status(200).json(announcements);
}

//Edit an announcement by _id
//TODO: get hoa id from auth instead of body
async function editAnnouncement(req, res) {
  const { id } = req.params;
  // check if announcement id is a valid mongoose id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Announcement Not Found" });
  }

  const { title, body, buildingNumber } = req.body;

  // get hoa id from user auth
  const { hoaID } = req.body; //change to auth id
  // check if hoa id is a valid mongoose id
  if (!mongoose.Types.ObjectId.isValid(hoaID)) {
    return res.status(404).json({ error: "HOA Not Found" });
  }

  const announcement = await Announcement.findOneAndUpdate(
    { HOA: hoaID, _id: id },
    {
      HOA: hoaID,
      title,
      body,
      buildingNumber,
    },
    { new: true }
  );

  if (!announcement) {
    return res.status(404).json({ error: "No Announcement Found" });
  }
  res.status(200).json(announcement);
}

//Delete a announcement by _id
//TODO: get hoa id from auth instead of body
async function deleteAnnouncement(req, res) {
  const { id } = req.params;
  // check if announcement id is a valid mongoose id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Announcement Not Found" });
  }

  // get hoa id from user auth
  const { hoaID } = req.body; //change to auth id
  // check if hoa id is a valid mongoose id
  if (!mongoose.Types.ObjectId.isValid(hoaID)) {
    return res.status(404).json({ error: "HOA Not Found" });
  }

  const announcement = await Announcement.findOneAndDelete({
    HOA: hoaID,
    _id: id,
  });
  if (!announcement) {
    return res.status(404).json({ error: "Announcement Not Found" });
  }
  res.status(200).json(announcement);
}

//* Tenants

//Get all announcements by building number
//TODO: get tenant id, hoa id from auth instead of body
async function getBuildingAnnouncements(req, res) {
  // get hoa id from user auth
  const { hoaID, tenantID } = req.body; //change to auth id

  //   check if id is a valid mongoose id
  if (!mongoose.Types.ObjectId.isValid(hoaID)) {
    return res.status(404).json({ error: "HOA Not Found" });
  }
  if (!mongoose.Types.ObjectId.isValid(tenantID)) {
    return res.status(404).json({ error: "Tenant Not Found" });
  }

  const tenant = await Tenant.findById(tenantID);
  const buildingNumber = tenant.buildingNumber;

  //get announcements relevant to both tenant building number and general messages for all buildings
  const announcements = await Announcement.find({
    HOA: hoaID,
    $or: [{ buildingNumber: buildingNumber }, { buildingNumber: "All" }],
  });
  if (!announcements) {
    return res.status(404).json({ error: "Announcement Not Found" });
  }
  res.status(200).json(announcements);
}

module.exports = {
  createAnnouncement,
  getAnnouncements,
  editAnnouncement,
  deleteAnnouncement,
  getBuildingAnnouncements,
};
