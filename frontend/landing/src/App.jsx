import React from "react";

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
      <Navbar />
      <Hero />
      <SellingPoints />
      <Features />
      <About />
      <Footer />
    </div>
  );
}

export default App;
