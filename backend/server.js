const express = require("express");
const cors = require("cors");
const app = express();

const port = 4000;

//logger
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Dummy Hello world
app.get("/", (req, res) => {
  res.status(200).json({ msg: "Hello World" });
});

// Run the server
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
