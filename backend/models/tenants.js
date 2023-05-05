const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
const crypto = require("crypto");

const Schema = mongoose.Schema;

const tenantSchema = new Schema(
  {
    hoa_id: {
      type: String,
      required: [true, "חובה להתחבר לחשבון ועד"],
    },
    firstName: {
      type: String,
      required: [true, "שם פרטי הינו שדה חובה"],
    },
    lastName: {
      type: String,
      required: [true, "שם ממשפחה הינו שדה חובה"],
    },
    buildingNumber: {
      type: String,
      required: [true, "מספר בניין הינו שדה חובה"],
    },
    apartmentNumber: {
      type: String,
      required: [true, "ספר דירה הינו שדה חובה"],
    },
    parkingSpot: {
      type: String,
    },
    phoneNumber: {
      type: String,
      required: [true, "מספר טלפון הינו שדה חובה"],
    },
    tenantEmail: {
      type: String,
      required: [true, "מייל דייר הינו שדה חובה"],
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    tenantType: {
      // Type is either an "Owner" or a "Renter"
      type: String,
      required: [true, "סוג דייר  הינו שדה חובה"],
    },
    ownerFirstName: {
      type: String,
      required: [true, "שם פרטי של בעל הבית הינו שדה חובה"],
    },
    ownerLastName: {
      type: String,
      required: [true, "שם משפחה של בעל הבית הינו שדה חובה"],
    },
    ownerPhoneNumber: {
      type: String,
      required: [true, "מספר טלפון של בעל הבית הינו שדה חובה"],
    },
    ownerEmail: {
      type: String,
      required: [true, "מייל של בעל הדירה הינו שדה חובה"],
    },
    token: {
      type: String,
    },
    tokenExpire: {
      type: Date,
    },
  },
  { timestamps: true }
);

// static signup method
tenantSchema.statics.signup = async function (
  hoa_id,
  firstName,
  lastName,
  buildingNumber,
  apartmentNumber,
  parkingSpot,
  phoneNumber,
  tenantEmail,
  username,
  tenantType,
  ownerFirstName,
  ownerLastName,
  ownerPhoneNumber,
  ownerEmail
) {
  // validation
  if (!hoa_id) {
    throw Error("הדייר חייב להיות משויך לועד בית.");
  }
  //check if all required values are passed
  if (
    !firstName ||
    !lastName ||
    !buildingNumber ||
    !apartmentNumber ||
    !phoneNumber ||
    !tenantEmail ||
    !username ||
    !tenantType ||
    !ownerFirstName ||
    !ownerLastName ||
    !ownerPhoneNumber ||
    !ownerEmail
  ) {
    throw Error("אחד או יותר מפרטי הדייר החובה חסרים.");
  }
  if (!validator.isEmail(tenantEmail) || !validator.isEmail(ownerEmail)) {
    throw Error("המייל שהיזנת אינו בפורמת מייל תקין.");
  }

  // check if the email already exists
  const exists = await this.findOne({ username });
  if (exists) {
    throw Error("הדייר כבר קיים במערכת.");
  }

  //create a random token
  const token = crypto.randomBytes(20).toString("hex");
  //hashing the token
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(token, salt);

  // signup the new user
  const user = await this.create({
    hoa_id,
    firstName,
    lastName,
    buildingNumber,
    apartmentNumber,
    parkingSpot,
    phoneNumber,
    tenantEmail,
    username,
    password: undefined, // put an undefined value for the password, to later be created by the tenant
    tenantType,
    ownerFirstName,
    ownerLastName,
    ownerPhoneNumber,
    ownerEmail,
    token: hash,
    tokenExpire: Date.now() + 3 * (24 * 60 * (60 * 1000)), //link valid for 3 days for the creation date
  });

  const userData = {
    user,
    token: token,
  };
  return userData;
};

//static login method
tenantSchema.statics.login = async function (username, password) {
  // validation
  if (!username || !password) {
    throw Error("אחד או יותר מהפרטים חסרים.");
  }

  // check if email exists
  const user = await this.findOne({ username });
  if (!user) {
    throw Error("אחד או יותר מהפרטים שהוזנו אינם תקינים.");
  }

  // check if the plain-text password matches the hashed password
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("אחד או יותר מהפרטים שהוזנו אינם תקינים.");
  }
  return user;
};

// static forgot password method
tenantSchema.statics.forgotPassword = async function (username) {
  // validation
  if (!username) {
    throw Error("שדה שם המשתמש היינו חובה לאיפוס הסיסמה.");
  }

  // check if username exists
  const user = await this.findOne({ username });
  if (!user) {
    throw Error("הוזן שם משתמש שגוי.");
  }

  //create a random token
  const token = crypto.randomBytes(20).toString("hex");
  //hashing the token
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(token, salt);

  user.token = hash;
  user.tokenExpire = Date.now() + 10 * (60 * 1000); //link is valid for only 10 minutes
  await user.save();

  const data = {
    firstName: user.firstName,
    email: user.tenantEmail,
    username: user.username,
    token: token,
  };
  return data;
};

// static change password according to token method
tenantSchema.statics.resetPassword = async function (resetToken, password) {
  // validation
  if (!resetToken || !password) {
    throw Error("אחד או יותר מהפרטים חסרים.");
  }

  //hash salt
  const salt = await bcrypt.genSalt(10);

  // hash the token and compare to the DB
  const tokenHash = await bcrypt.hash(resetToken, salt);
  const user = await this.findOne({
    tokenHash,
    tokenExpire: { $gt: Date.now() },
  });

  if (!user) {
    throw Error("הקישור שקבלת אינו תקין, נא לנסות לאפס את הסיסמה שינית.");
  }

  // hash the password
  const hash = await bcrypt.hash(password, salt);

  // update the password and revoke the token
  user.password = hash;
  user.token = undefined;
  user.tokenExpire = undefined;
  await user.save();

  return user;
};

// static change password using old password method
tenantSchema.statics.changePassword = async function (
  _id,
  currentPassword,
  newPassword
) {
  // validation
  if (!currentPassword || !newPassword) {
    throw Error("אחד או יותר מהפרטים חסרים.");
  }
  // check if user exists
  const user = await this.findOne({ _id });
  if (!user) {
    throw Error("חשבון הדייר אינו קיים במערכת.");
  }
  // check if provided current password is correct
  const match = await bcrypt.compare(currentPassword, user.password);
  if (!match) {
    throw Error("הסיסממה הנוכחית אינה תקינה.");
  }
  if (match) {
    //hash salt
    const salt = await bcrypt.genSalt(10);
    // hash the password
    const hash = await bcrypt.hash(newPassword, salt);
    user.password = hash;
    await user.save();
    return user;
  }
};

module.exports = mongoose.model("Tenant", tenantSchema);
