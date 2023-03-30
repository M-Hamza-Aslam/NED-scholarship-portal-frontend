import React from "react";
import Navbar from "./components/Navigation/Navbar";
import Landing from "./components/Landing/Landing";
import Registeration from "./components/Registeration/Registeration";
import Login from "./components/Registeration/Login";
import Signup from "./components/Registeration/Signup";
import ForgotPassword from "./components/Registeration/ForgotPassword";
import ResetPassword from "./components/Registeration/ResetPassword";
import { useLocation } from "react-router";
import { Routes, Route } from "react-router-dom";
import store from "./store/store";
import { Provider } from "react-redux";

import "./App.css";

function App() {
  const location = useLocation();

  return (
    <Provider store={store}>
      {!location.pathname.includes("/auth") && <Navbar />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth/*" element={<Registeration />}>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password/:token" element={<ResetPassword />} />
        </Route>
        <Route path="/" element={<h1>Home Page</h1>} />
      </Routes>
    </Provider>
  );
}

export default App;
