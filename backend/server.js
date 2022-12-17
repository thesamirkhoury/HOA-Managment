require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
//Routes
const managersRoutes = require("./routes/managers");
const tenantsRoutes = require("./routes/tenants");

//express app
const app = express();
const port = 4000;

//middleware
//CORS
const corsOptions = {
  origin: ["http://localhost:3000",process.env.LCL_IP], //for the meantime only accept from localhost
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
app.use("/api/managers", managersRoutes);
app.use("/api/tenants", tenantsRoutes);

// Make the Queries Strict and Remove Deprecation Warning
mongoose.set("strictQuery", true);
// Connect to DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connected to database");
    // Run the server on the port
    app.listen(port, () => {
      console.log(`Server running on port: ${port}`);
    });
})
.catch((err)=>{
  console.log(err);
});
