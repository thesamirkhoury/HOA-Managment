import React from "react";
import { Routes, Route } from "react-router-dom";

//components
import Navbar from "./components/Navbar";
//Sections
import Hero from "./components/Sections/Hero";
import SellingPoints from "./components/Sections/SellingPoints";
import Features from "./components/Sections/Features";
import About from "./components/Sections/About";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Home page */}
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Hero />
              <SellingPoints />
              <Features />
              <About />
              <Footer />
            </>
          }
          exact
        />

        {/* Terms and conditions page */}
        <Route path="/terms" element={<></>} exact />

        {/* 404 Page for non-existing pages */}
        <Route path="*" element={<></>} exact />
      </Routes>
    </div>
  );
}

export default App;
