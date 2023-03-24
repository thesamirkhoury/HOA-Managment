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
const hoaRoutesTenant = require("./routes/TenantRoutes/hoa");
const tenantRoutesTenant = require("./routes/TenantRoutes/tenants");
const announcementRoutesTenant = require("./routes/TenantRoutes/announcements");
const maintenanceRoutesTenant = require("./routes/TenantRoutes/maintenance");
const inquiriesRoutesTenant = require("./routes/TenantRoutes/inquiries");
const billingRoutesTenant = require("./routes/TenantRoutes/billing");
const documentRoutesTenant = require("./routes/TenantRoutes/documents");

//express app
const app = express();
const port = 4000;

//middleware
//CORS
const corsOptions = {
  origin: [
    "http://localhost:3000",
    "http://localhost:3001",
    process.env.LCL_IP,
  ], //for the meantime only accept from localhost
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

//* Authentication
app.use("/api", authentication);

//* Managers
app.use("/api/managers/details", hoaRoutesManager);
app.use("/api/managers/tenants", tenantRoutesManager);
app.use("/api/managers/suppliers", supplierRoutesManager);
app.use("/api/managers/reminders", reminderRoutesManager);
app.use("/api/managers/announcements", announcementRoutesManager);
app.use("/api/managers/maintenance", maintenanceRoutesManager);
app.use("/api/managers/inquiries", inquiriesRoutesManager);
app.use("/api/managers/billing", billingRoutesManager);
app.use("/api/managers/expenses", expenseRoutesManager);
app.use("/api/managers/documents", documentRoutesManager);

//* Tenants
// app.use("/api/managers", authenticationManager);
app.use("/api/tenants/hoa", hoaRoutesTenant);
app.use("/api/tenants/tenants", tenantRoutesTenant); //? review endpoint link
app.use("/api/tenants/announcements", announcementRoutesTenant);
app.use("/api/tenants/maintenance", maintenanceRoutesTenant);
app.use("/api/tenants/inquiries", inquiriesRoutesTenant);
app.use("/api/tenants/billing", billingRoutesTenant);
app.use("/api/tenants/documents", documentRoutesTenant);

//*API Details
app.get("/api/ver", (req, res) => {
  res.status(200).json({ version: "0.1.1" });
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
      console.log(`Server running on port: ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
