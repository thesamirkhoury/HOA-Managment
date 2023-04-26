import React from "react";

//components
import Navbar from "./components/Navbar";
//Sections
import Hero from "./components/Sections/Hero";
import SellingPoints from "./components/Sections/SellingPoints";
import Features from "./components/Sections/Features";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <SellingPoints />
      <Features />
    </div>
  );
}

export default App;
