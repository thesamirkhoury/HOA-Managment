require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

//Import Routes
//* Authentication route
const authentication = require("./routes/authentication");

//* Manager routes
const hoaRoutesManager = require("./routes/managerRoutes/hoa");
const tenantRoutesManager = require("./routes/managerRoutes/tenants");
const supplierRoutesManager = require("./routes/managerRoutes/suppliers");
const reminderRoutesManager = require("./routes/managerRoutes/reminders");
const announcementRoutesManager = require("./routes/managerRoutes/announcements");
const maintenanceRoutesManager = require("./routes/managerRoutes/maintenance");
const inquiriesRoutesManager = require("./routes/managerRoutes/inquiries");
const billingRoutesManager = require("./routes/managerRoutes/billing");
const expenseRoutesManager = require("./routes/managerRoutes/expenses");
const documentRoutesManager = require("./routes/managerRoutes/documents");

//* Tenant routes
const hoaRoutesTenant = require("./routes/tenantRoutes/hoa");
const tenantRoutesTenant = require("./routes/tenantRoutes/tenants");
const announcementRoutesTenant = require("./routes/tenantRoutes/announcements");
const maintenanceRoutesTenant = require("./routes/tenantRoutes/maintenance");
const inquiriesRoutesTenant = require("./routes/tenantRoutes/inquiries");
const billingRoutesTenant = require("./routes/tenantRoutes/billing");
const expenseRoutesTenant = require("./routes/tenantRoutes/expenses");
const documentRoutesTenant = require("./routes/tenantRoutes/documents");

//express app
const app = express();
const port = process.env.PORT;

//middleware
const { ensureUploadPaths } = require("./middleware/upload");
//CORS
const corsOptions = {
  origin: [process.env.BOARD_URL, process.env.TENANTS_URL],
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

//JSON Parser
app.use(express.json());

//debug logger
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//routes
//* Logo Asset
app.use("/logo", express.static("./assets/Logo.svg"));

//* Authentication
app.use("/", authentication);

//* Managers
app.use("/managers/details", hoaRoutesManager);
app.use("/managers/tenants", tenantRoutesManager);
app.use("/managers/suppliers", supplierRoutesManager);
app.use("/managers/reminders", reminderRoutesManager);
app.use("/managers/announcements", announcementRoutesManager);
app.use("/managers/maintenance", maintenanceRoutesManager);
app.use("/managers/inquiries", inquiriesRoutesManager);
app.use("/managers/billing", billingRoutesManager);
app.use("/managers/expenses", expenseRoutesManager);
app.use("/managers/documents", documentRoutesManager);

//* Tenants
app.use("/tenants/hoa", hoaRoutesTenant);
app.use("/tenants/details", tenantRoutesTenant);
app.use("/tenants/announcements", announcementRoutesTenant);
app.use("/tenants/maintenance", maintenanceRoutesTenant);
app.use("/tenants/inquiries", inquiriesRoutesTenant);
app.use("/tenants/billing", billingRoutesTenant);
app.use("/tenants/expenses", expenseRoutesTenant);
app.use("/tenants/documents", documentRoutesTenant);

//*API Details
app.get("/ver", (req, res) => {
  res.status(200).json({ version: "0.6" });
});

// Make the Queries Strict and Remove Deprecation Warning
mongoose.set("strictQuery", true);
// Connect to DB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connected to database");
    // Run the server on the port
    app.listen(port, () => {
      // check if uploads folders exits, if not create them
      ensureUploadPaths();
      // log the port the server is running on
      console.log(`Server running on port: ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
