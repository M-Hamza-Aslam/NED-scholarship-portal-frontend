import React, { useState, useEffect, useCallback, Suspense } from "react";
import Navbar from "./components/Navigation/Navbar";
import Footer from "./components/Navigation/Footer";
import Landing from "./components/Landing/Landing";
import Registeration from "./components/Registeration/Registeration";
import ScholarshipList from "./components/Scholarship/ScholarshipList";
import ScholarshipDetail from "./components/Scholarship/ScholarshipDetail";
import UserList from "./components/Admin/Users/UserList";
import { useLocation } from "react-router";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import jwtDecode from "jwt-decode";
import { userActions } from "./store/userSlice";
import { ToastContainer } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { BACKEND_DOMAIN } from "./config";
import UserDetails from "./components/Admin/Users/UserDetails";
import CreateScholarship from "./components/Admin/CreateScholarship/CreateScholarship";
import { adminActions } from "./store/adminSlice";
import AppliedScholarshipList from "./components/User/AppliedScholarships/AppliedScholarshipList";
// import UserProfile from "./components/Admin/Users/Profile/UserProfile";

const Login = React.lazy(() => import("./components/Registeration/Login"));
const Signup = React.lazy(() => import("./components/Registeration/Signup"));
const ForgotPassword = React.lazy(() =>
  import("./components/Registeration/ForgotPassword")
);
const ResetPassword = React.lazy(() =>
  import("./components/Registeration/ResetPassword")
);
const Profile = React.lazy(() => import("./components/Profile/Profile"));

const UserProfile = React.lazy(() =>
  import("./components/Admin/Users/Profile/UserProfile")
);

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
      const userRole = decodedToken.userRole;
      const expirationTime = decodedToken.expiration;
      if (Date.now() < expirationTime) {
        let apiEndPoint = `${BACKEND_DOMAIN}/getLoginData`;
        if (userRole === "admin") {
          apiEndPoint = `${BACKEND_DOMAIN}/admin/getLoginData`;
        }
        const res = await fetch(apiEndPoint, {
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
        if (userData.userRole === "admin") {
          dispatch(adminActions.updateAdminData(userData));
        } else if (userData.userRole === "student") {
          dispatch(userActions.updateUserData(userData));
        }
        // setting time to delete token from localstorage
        const timeout = expirationTime - Date.now();
        setTimeout(() => {
          localStorage.removeItem("token");
          if (userData.userRole === "admin") {
            dispatch(adminActions.clearAdminData());
          } else if (userData.userRole === "student") {
            dispatch(userActions.clearUserData());
          }
          navigate("/auth/login");
        }, timeout);
        setLoading(false);
      } else {
        localStorage.removeItem("token");
        if (userRole === "admin") {
          dispatch(adminActions.clearAdminData());
        } else if (userRole === "student") {
          dispatch(userActions.clearUserData());
        }
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
        <div className="loadingDiv">
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
            <Route
              path="/admin/create-scholarship"
              element={<CreateScholarship />}
            />
            <Route path="/scholarship-list" element={<ScholarshipList />} />
            <Route
              path="/applied-scholarship-list"
              element={<AppliedScholarshipList />}
            />
            <Route
              path="/scholarship-list/:scholarshipId"
              element={<ScholarshipDetail />}
            />
            <Route path="/user-list" element={<UserList />} />
            <Route path="/userProfile" element={<UserProfile />} />
            <Route path="/" element={<h1>Home Page</h1>} />
            <Route path="/profile" element={<Profile />} />
            {/* <Route path="/*" element={<Landing />} /> */}
          </Routes>
          {!location.pathname.includes("/auth") && <Footer />}
          <ToastContainer />
        </Suspense>
      )}
    </>
  );
}

export default App;
