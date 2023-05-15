import React from "react";
import { Routes, Route } from "react-router-dom";

//Components
import Navbar from "./components/Navbar";
//Pages
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Home page */}
        <Route path="/" element={<Home />} exact />

        {/* Terms and conditions page */}
        <Route path="/terms" element={<></>} exact />

        {/* 404 Page for non-existing pages */}
        <Route path="*" element={<NotFound />} exact />
      </Routes>
    </div>
  );
}

export default App;
