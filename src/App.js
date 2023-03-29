import React, { Fragment } from "react";
import Navbar from "./components/Navigation/Navbar";
import Landing from "./components/Landing/Landing";
import Registeration from "./components/Registeration/Registeration";
import Login from "./components/Registeration/Login";
import Signup from "./components/Registeration/Signup";
import ForgotPassword from "./components/Registeration/ForgotPassword";
import { useNavigate } from "react-router";
import { Routes, Route } from "react-router-dom";

import "./App.css";

function App() {
  const navigate = useNavigate();
  
  return (
    <Fragment>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth/*" element={<Registeration />}>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="reset-password" element={<ForgotPassword />} />
        </Route>
        <Route path="/" element={<h1>Home Page</h1>} />
      </Routes>
    </Fragment>
  );
}

export default App;
