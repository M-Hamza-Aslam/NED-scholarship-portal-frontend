import React, { Fragment } from "react";
import Navbar from "./components/Navigation/Navbar";
import Footer from "./components/Navigation/Footer";
import Landing from "./components/Landing/Landing";
import Registeration from "./components/Registeration/Registeration";
import Login from "./components/Registeration/Login";
import Signup from "./components/Registeration/Signup";
import ForgotPassword from "./components/Registeration/ForgotPassword";
import ScholarshipList from "./components/Scholarship/ScholarshipList";
import ScholarshipDetail from "./components/Scholarship/ScholarshipDetail";
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
        <Route path="/scholarship-list" element={<ScholarshipList />} />
        <Route
          path="/scholarship-list/:scholarshipId"
          element={<ScholarshipDetail />}
        />
        <Route path="/" element={<h1>Home Page</h1>} />
      </Routes>
      <Footer />
    </Fragment>
  );
}

export default App;
