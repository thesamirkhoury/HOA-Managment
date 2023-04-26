import React from "react";

//components
import Navbar from "./components/Navbar";
//Sections
import Hero from "./components/Sections/Hero";
import SellingPoints from "./components/Sections/SellingPoints";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <SellingPoints/>
    </div>
  );
}

export default App;
