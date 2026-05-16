import React from "react";

import "./App.css";
import LandingPage from "./LandingPage";
import Navbar from "./Utils/Navbar";
import { isLoggedIn, logout } from './auth';
import Login from "./Auth/Login";
import AuthPage from "./Auth/AuthPage";

function App() {
  return (
    <div className="bg-light w-100 h-100vh border border-dark align-center inter-400" style={{ minWidth: "400px" }}>
      {isLoggedIn() ? <LandingPage /> : <AuthPage/>}
    </div>
  );
}

export default App;
