import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hook/useAuthContext";

//Pages and Components
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Loader from "./components/Loader";
import Announcements from "./pages/Announcements";
import Maintenance from "./pages/Maintenance";
import Inquires from "./pages/Inquires";
import Billing from "./pages/Billing";
import Financial from "./pages/Financial";
import Documents from "./pages/Documents";
import HOADetails from "./pages/HOADetails";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

function App() {
  const { user } = useAuthContext();

  return (
    <div className="App">
      <Navbar />
      {/* Flex box container */}
      <div className="container">
        {/* Sidebar - shown oly when logged in*/}
        {user && (
          <div className="sidebar">
            <Sidebar />
          </div>
        )}
        {/* Content */}
        <div className="content ps-2">
          <Routes>
            {/* Main Page - Redirect to the first page in the dashboard */}
            <Route path="/" element={<Navigate to="announcements" />} exact />
            {/* Dashboard pages */}
            <Route path="announcements" element={<Announcements />} exact />
            <Route path="maintenance" element={<Maintenance />} exact />
            <Route path="inquires" element={<Inquires />} exact />
            <Route path="billings" element={<Billing />} exact />
            <Route path="financial" element={<Financial />} exact />
            <Route path="documents" element={<Documents />} exact />
            <Route path="hoa-details" element={<HOADetails />} exact />
            <Route path="settings" element={<Settings />} exact />
            {/* Auth pages */}
            <Route path="login" element={<Login />} exact />
            {/* 404 Page for non-existing pages */}
            <Route path="*" element={<NotFound />} exact />
          </Routes>
        </div>
      </div>
      {/* //*Loader Modal */}
      <Loader />
    </div>
  );
}

export default App;
