import React, { useState } from "react";

import { Routes, Route, Navigate } from "react-router-dom";

//Pages and Components
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Tenants from "./pages/Tenants";
import Suppliers from "./pages/Suppliers";
import Reminders from "./pages/Reminders";
import Notifications from "./pages/Notifications";
import Maintenance from "./pages/Maintenance";
import Inquires from "./pages/Inquires";
import Billing from "./pages/Billing";
import Expenses from "./pages/Expenses";
import Financial from "./pages/Financial";
import Documents from "./pages/Documents";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <div className="App">
      <Navbar />
      {/* Flex box container */}
      <div className="container">
        {/* Sidebar */}
        <div className="sidebar">
          <Sidebar />
        </div>
        {/* Content */}
        <div className="content ps-2">
          <Routes>
            {/* Main Page - Redirect to the first page in the dashboard */}
            <Route path="/" element={<Navigate to="tenants" />} exact />
            {/* Dashboard pages */}
            <Route path="tenants" element={<Tenants />} exact />
            <Route path="suppliers" element={<Suppliers />} exact />
            <Route path="reminders" element={<Reminders />} exact />
            <Route path="notifications" element={<Notifications />} exact />
            <Route path="maintenance" element={<Maintenance />} exact />
            <Route path="inquires" element={<Inquires />} exact />
            <Route path="billings" element={<Billing />} exact />
            <Route path="expenses" element={<Expenses />} exact />
            <Route path="financial" element={<Financial />} exact />
            <Route path="documents" element={<Documents />} exact />
            <Route path="settings" element={<Settings />} exact />
            {/* Auth pages */}
            <Route path="login" element={<Login />} exact />
            <Route path="signup" element={<Signup />} exact />
            {/* 404 Page for non-existing pages */}
            <Route path="*" element={<NotFound />} exact />{" "}
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
