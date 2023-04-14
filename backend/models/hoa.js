const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
const crypto = require("crypto");

const Schema = mongoose.Schema;

const hoaSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "שם פרטי הינו שדה חובה"],
    },
    lastName: {
      type: String,
      required: [true, "שם משפחה הינו שדה חובה"],
    },
    phoneNumber: {
      type: String,
      required: [true, "מספר טלפון הינו שדה חובה"],
    },
    email: {
      type: String,
      required: [true, "מייל הינו שדה חובה"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "סיסממה הינה שדה חובה"],
    },
    address: {
      type: String,
      required: [true, "כתובת הינו שדה חובה"],
    },
    membersMonthlyFee: {
      type: String,
      required: [true, "דמי ועד חודשיים הינו שדה חובה"],
    },
    buildingCount: {
      type: Number,
      required: [true, "ספר הבניינים הינו שדה חובה"],
    },
    fileNumber: {
      type: String,
      required: [true, "מספר תיק הינו שדה חובה"],
      unique: true,
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
hoaSchema.statics.signup = async function (
  firstName,
  lastName,
  email,
  password,
  address,
  membersMonthlyFee,
  buildingCount,
  fileNumber
) {
  // validation
  if (
    !firstName ||
    !lastName ||
    !email ||
    !password ||
    !address ||
    !membersMonthlyFee ||
    !buildingCount ||
    !fileNumber
  ) {
    throw Error("אחד או יותר מפרטי הועד החובה חסרים.");
  }
  if (!validator.isEmail(email)) {
    throw Error("המייל שהיזנת אינו בפורמת מייל תקין.");
  }

  // check if the email or HOA File Number already exists
  const exists = await this.findOne({ email });
  if (exists) {
    throw Error("המייל כבר קיים במערכת.");
  }
  const fileNumberExists = await this.findOne({ fileNumber });
  if (fileNumberExists) {
    throw Error("כבר קיים ועד עם מספר התיק שהוזן.");
  }

  // hash the password
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  // signup the new user
  const user = await this.create({
    firstName,
    lastName,
    email,
    password: hash,
    address,
    membersMonthlyFee,
    buildingCount,
    fileNumber,
  });
  return user;
};

//static login method
hoaSchema.statics.login = async function (email, password) {
  // validation
  if (!email || !password) {
    throw Error("אחד או יותר מהפרטים חסרים.");
  }

  // check if email exists
  const user = await this.findOne({ email });
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
hoaSchema.statics.forgotPassword = async function (email) {
  // validation
  if (!email) {
    throw Error("שדה המייל היינו חובה לאיפוס הסיסמה.");
  }

  // check if email exists
  const user = await this.findOne({ email });
  if (!user) {
    throw Error("הוזן מייל שגוי.");
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
    email: user.email,
    token: token,
  };
  return data;
};

// static change password using a reset token method
hoaSchema.statics.resetPassword = async function (resetToken, password) {
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
    throw Error("הקישור שקבלת אינו תקין, נא לנסות לאפס את הסיסה שינית.");
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
hoaSchema.statics.changePassword = async function (
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
    throw Error("חשבון הועד אינו קיים במערכת.");
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

module.exports = mongoose.model("HOA", hoaSchema);
