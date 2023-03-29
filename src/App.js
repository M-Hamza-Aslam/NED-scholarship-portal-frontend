import React from "react";
import "./App.css";
import Registeration from "./components/Registeration/Registeration";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Registeration/Login";
import Signup from "./components/Registeration/Signup";
import ForgotPassword from "./components/Registeration/ForgotPassword";

function App() {
  return (
    <Routes>
      <Route path="/auth/*" element={<Registeration />}>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="reset-password" element={<ForgotPassword />} />
      </Route>
      <Route path="/" element={<h1>Home Page</h1>} />
    </Routes>
  );
}

export default App;
