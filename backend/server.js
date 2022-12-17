const express = require("express");
const cors = require("cors");
const app = express();
//Routes
const managersRoutes = require("./routes/managers");
const tenantsRoutes = require("./routes/tenants");

const port = 4000;

//debug logger
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/managers", managersRoutes);
app.use("/api/tenants", tenantsRoutes);

// Run the server
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
