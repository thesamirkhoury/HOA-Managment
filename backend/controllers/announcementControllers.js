const Announcement = require("../models/announcements");
const mongoose = require("mongoose");

//* Managers

//Create a new announcement
async function createAnnouncement(req, res) {
  const { title, body, buildingNumber } = req.body;
  // hoa id from auth
  const hoa_id = req.user._id;

  //Validation
  if (!title || !body || !buildingNumber) {
    return res.status(400).json({ error: "אחד או יותר מהפרטים חסרים." });
  }

  try {
    const announcement = await Announcement.create({
      hoa_id,
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
async function getAnnouncements(req, res) {
  // hoa id from auth
  const hoa_id = req.user._id;

  const announcements = await Announcement.find({ hoa_id }).sort({
    createdAt: -1,
  });

  if (!announcements) {
    return res.status(404).json({ error: "לא נמצאו הודעות במערכת." });
  }
  res.status(200).json(announcements);
}

//Edit an announcement by _id
async function editAnnouncement(req, res) {
  const { id } = req.params;
  // check if announcement id is a valid mongoose id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "הודעה זאת אינה קיית בערכת." });
  }
  const { title, body, buildingNumber } = req.body;

  const announcement = await Announcement.findByIdAndUpdate(
    id,
    {
      title,
      body,
      buildingNumber,
    },
    { new: true }
  );

  if (!announcement) {
    return res.status(404).json({ error: "הודעה זאת אינה קמיית במערכת." });
  }
  res.status(200).json(announcement);
}

//Delete a announcement by _id
async function deleteAnnouncement(req, res) {
  const { id } = req.params;
  // check if announcement id is a valid mongoose id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "הודעה זאת אינה קמיית במערכת." });
  }

  const announcement = await Announcement.findByIdAndDelete(id);
  if (!announcement) {
    return res.status(404).json({ error: "הודעה זאת אינה קמיית במערכת." });
  }
  res.status(200).json(announcement);
}

//* Tenants

//Get all announcements by building number
async function getBuildingAnnouncements(req, res) {
  // tenant id from auth
  const hoa_id = req.user.hoa_id;
  // tenant building from auth
  const buildingNumber = req.user.buildingNumber;

  //get announcements relevant to both tenant building number and general messages for all buildings
  const announcements = await Announcement.find({
    hoa_id,
    $or: [{ buildingNumber: buildingNumber }, { buildingNumber: 0 }],
  });
  if (!announcements) {
    return res.status(404).json({ error: "לא נמצאו הודעות במערכת." });
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
