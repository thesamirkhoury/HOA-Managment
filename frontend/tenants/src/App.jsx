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
import SetPassword from "./pages/SetPassword";
import ForgotPassword from "./pages/ForgotPassword";
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
            {/* Main Page - Redirect to the first page in the dashboard if user is logged in, else redirect to login page */}
            <Route
              path="/"
              element={
                user ? (
                  <Navigate to="/announcements" />
                ) : (
                  <Navigate to="/login" />
                )
              }
              exact
            />
            {/* Dashboard pages */}
            <Route
              path="announcements"
              element={user ? <Announcements /> : <Navigate to="/login" />}
              exact
            />
            <Route
              path="maintenance"
              element={user ? <Maintenance /> : <Navigate to="/login" />}
              exact
            />
            <Route
              path="inquires"
              element={user ? <Inquires /> : <Navigate to="/login" />}
              exact
            />
            <Route
              path="billings"
              element={user ? <Billing /> : <Navigate to="/login" />}
              exact
            />
            <Route
              path="financial"
              element={user ? <Financial /> : <Navigate to="/login" />}
              exact
            />
            <Route
              path="documents"
              element={user ? <Documents /> : <Navigate to="/login" />}
              exact
            />
            <Route
              path="hoa-details"
              element={user ? <HOADetails /> : <Navigate to="/login" />}
              exact
            />
            <Route
              path="settings"
              element={user ? <Settings /> : <Navigate to="/login" />}
              exact
            />
            {/* Auth pages */}
            <Route
              path="login"
              element={!user ? <Login /> : <Navigate to="/" />}
              exact
            />
            <Route
              path="forgot-password"
              element={!user ? <ForgotPassword /> : <Navigate to="/" />}
              exact
            />
            <Route
              path="set-password/:resetToken"
              element={!user ? <SetPassword /> : <Navigate to="/" />}
              exact
            />
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
