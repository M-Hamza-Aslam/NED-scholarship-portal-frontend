import React, { useEffect, useCallback, Suspense } from "react";
import Navbar from "./components/Navigation/Navbar";
import Footer from "./components/Navigation/Footer";
import Landing from "./components/Landing/Landing";
import Registeration from "./components/Registeration/Registeration";
import ScholarshipList from "./components/Scholarship/ScholarshipList";
import ScholarshipDetail from "./components/Scholarship/ScholarshipDetail";
// import Login from "./components/Registeration/Login";
// import Signup from "./components/Registeration/Signup";
// import ForgotPassword from "./components/Registeration/ForgotPassword";
// import ResetPassword from "./components/Registeration/ResetPassword";
// import Profile from "./components/Profile/Profile";
import { useLocation } from "react-router";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import jwtDecode from "jwt-decode";
import { userActions } from "./store/userSlice";

import "./App.css";

const Login = React.lazy(() => import("./components/Registeration/Login"));
const Signup = React.lazy(() => import("./components/Registeration/Signup"));
const ForgotPassword = React.lazy(() =>
  import("./components/Registeration/ForgotPassword")
);
const ResetPassword = React.lazy(() =>
  import("./components/Registeration/ResetPassword")
);
const Profile = React.lazy(() => import("./components/Profile/Profile"));

const openURL = ["/", "/auth/login", "/auth/signup", "/auth/forget-password"];

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchUserData = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      const expirationTime = decodedToken.expiration;
      if (Date.now() < expirationTime) {
        const res = await fetch(
          "https://ned-scholarship-portal.onrender.com/getLoginData",
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        if (res.status !== 200) {
          console.log(res);
          localStorage.removeItem("token");
          if (openURL.includes(location.pathname)) {
            return;
          }
          navigate("/auth/login");
        }
        const resData = await res.json();
        // add data in redux store.

        const userData = {
          _id: resData.userId,
          token: token,
          ...resData.userDetails,
        };
        dispatch(userActions.updateUserData(userData));
        // setting time to delete token from localstorage
        const timeout = expirationTime - Date.now();
        setTimeout(() => {
          localStorage.removeItem("token");
          dispatch(userActions.clearUserData());
        }, timeout);
      } else {
        localStorage.removeItem("token");
        dispatch(userActions.clearUserData());
        if (openURL.includes(location.pathname)) {
          return;
        }
        navigate("/auth/login");
      }
    } else {
      if (openURL.includes(location.pathname)) {
        return;
      }
      navigate("/auth/login");
    }
  }, []);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  return (
    <Suspense>
      {!location.pathname.includes("/auth") && <Navbar />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth/*" element={<Registeration />}>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password/:token" element={<ResetPassword />} />
        </Route>
        <Route path="/scholarship-list" element={<ScholarshipList />} />
        <Route
          path="/scholarship-list/:scholarshipId"
          element={<ScholarshipDetail />}
        />
        <Route path="/" element={<h1>Home Page</h1>} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/*" element={<Landing />} />
      </Routes>
      <Footer />
    </Suspense>
  );
}

export default App;
