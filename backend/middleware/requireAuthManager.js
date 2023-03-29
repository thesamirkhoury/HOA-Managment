const jwt = require("jsonwebtoken");
const HOA = require("../models/hoa");

async function requireAuthManager(req, res, next) {
  //verify auth
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json("Auth token required");
  }

  const token = authorization.split(" ")[1];

  //verify token.
  try {
    const { _id } = jwt.verify(token, process.env.SECRET);
    req.user = await HOA.findOne({ _id }).select("_id fileNumber");
    // if user is not found
    if (!req.user) {
      throw Error();
    }

    next();
  } catch (error) {
    res.status(401).json({ error: "Request is not authorized" });
  }
}

module.exports = requireAuthManager;
