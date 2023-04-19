import React, { useEffect, useCallback, Suspense } from "react";
import Navbar from "./components/Navigation/Navbar";
import Landing from "./components/Landing/Landing";
import Registeration from "./components/Registeration/Registeration";
import { useLocation } from "react-router";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import jwtDecode from "jwt-decode";
import { userActions } from "./store/userSlice";
import CircularProgress from "@mui/material/CircularProgress";

import "./App.css";
import { BACKEND_DOMAIN } from "./config";
import { useState } from "react";

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
  const [loading, setLoading] = useState(false);

  const fetchUserData = useCallback(async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      const expirationTime = decodedToken.expiration;
      if (Date.now() < expirationTime) {
        const res = await fetch(`${BACKEND_DOMAIN}/getLoginData`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
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
        console.log(userData);
        dispatch(userActions.updateUserData(userData));
        // setting time to delete token from localstorage
        const timeout = expirationTime - Date.now();
        setTimeout(() => {
          localStorage.removeItem("token");
          dispatch(userActions.clearUserData());
          navigate("/auth/login");
        }, timeout);
        setLoading(false);
      } else {
        localStorage.removeItem("token");
        dispatch(userActions.clearUserData());
        if (openURL.includes(location.pathname)) {
          setLoading(false);
          return;
        }
        setLoading(false);

        navigate("/auth/login");
      }
    } else {
      if (openURL.includes(location.pathname)) {
        setLoading(false);
        return;
      }
      setLoading(false);

      navigate("/auth/login");
    }
  }, []);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  return (
    <>
      {loading ? (
        <div className="loading">
          <CircularProgress />
          <h5>Please Wait...</h5>
        </div>
      ) : (
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
            <Route path="/profile" element={<Profile />} />
            {/* <Route path="/*" element={<Landing />} /> */}
          </Routes>
        </Suspense>
      )}
    </>
  );
}

export default App;
