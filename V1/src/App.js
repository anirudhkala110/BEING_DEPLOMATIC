import React from "react";

import "./App.css";
import LandingPage from "./LandingPage";
import Navbar from "./Utils/Navbar";

function App() {
  return (
    <div className="bg-light w-100 h-100vh border border-dark align-center inter-400" style={{ minWidth: "400px" }}>
      <LandingPage />
    </div>
  );
}

export default App;
