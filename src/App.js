import React, { useState, useEffect, useCallback, Suspense } from "react";
import Navbar from "./components/Navigation/Navbar";
import Footer from "./components/Navigation/Footer";
import Landing from "./components/Landing/Landing";
import Registeration from "./components/Registeration/Registeration";
import ScholarshipList from "./components/Scholarship/ScholarshipList";
import ScholarshipDetail from "./components/Scholarship/ScholarshipDetail";
import UserList from "./components/Admin/Users/UserList";
import { useLocation } from "react-router";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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
import EmailVerification from "./components/Registeration/EmailVerification";
import AlumniScholarshipList from "./components/Alumni/AlumniScholarshipList";
import AlumniScholarshipDetail from "./components/Alumni/AlumniScholarshipDetail";
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

const AlumniProfile = React.lazy(() =>
  import("./components/Alumni/Profile/Profile")
);

const UserProfile = React.lazy(() =>
  import("./components/Admin/Users/Profile/UserProfile")
);

const openURL = [
  "/auth/login",
  "/auth/signup",
  "/auth/forget-password",
  "/auth/reset-password/:token",
  "/",
];

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isVerified = useSelector((state) => state.user.user.isVerified);
  let status = useSelector((state) => state.user.user.userRole);
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
        if (userRole === "alumni") {
          apiEndPoint = `${BACKEND_DOMAIN}/alumni/getLoginData`;
        }
        const res = await fetch(apiEndPoint, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        if (res.status !== 200) {
          // console.log(res);
          localStorage.removeItem("token");
          if (openURL.includes(location.pathname)) {
            return;
          }
          navigate("/auth/login");
        }
        const resData = await res.json();

        localStorage.setItem("token", resData.token);

        // add data in redux store.

        const userData = {
          _id: resData.userId,
          token: resData.token,
          ...resData.userDetails,
        };

        if (userData.userRole === "admin") {
          dispatch(adminActions.updateAdminData(userData));
          dispatch(userActions.updateUserData({ userRole: "admin" }));
        } else if (userData.userRole === "student") {
          dispatch(userActions.updateUserData(userData));
        }
        // setting time to delete token from localstorage
        setTimeout(() => {
          localStorage.removeItem("token");
          if (userData.userRole === "admin") {
            dispatch(adminActions.clearAdminData());
          } else if (userData.userRole === "student") {
            dispatch(userActions.clearUserData());
          }
          navigate("/auth/login");
        }, 3600000);
        setLoading(false);

        if (userData.userRole === "student" && userData.isVerified === false) {
          navigate("/auth/verify-email");
        }
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
      } else if (location.pathname.split("/")[2] === "reset-password") {
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
          {status === "admin" ? (
            <Routes>
              <Route
                path="/admin/create-scholarship"
                element={<CreateScholarship />}
              />
              <Route
                path="admin/scholarship-list"
                element={<ScholarshipList />}
              />
              <Route
                path="admin/alumni-scholarship-list"
                element={<AlumniScholarshipList />}
              />
              <Route
                path="admin/scholarship-list/:scholarshipId"
                element={<ScholarshipDetail />}
              />
              <Route
                path="admin/user-list/:scholarshipId"
                element={<UserList />}
              />
              <Route
                path="admin/alumni-scholarship-list/:scholarshipId"
                element={<AlumniScholarshipDetail />}
              />
              <Route
                path="admin/user-details/:userId/:scholarshipId"
                element={<UserProfile />}
              />
              <Route
                path="*"
                element={<Navigate to="admin/scholarship-list" />}
              />
            </Routes>
          ) : status === "student" ? (
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/auth/*" element={<Registeration />}>
                <Route path="verify-email" element={<EmailVerification />} />
              </Route>

              <Route path="/scholarship-list" element={<ScholarshipList />} />
              <Route
                path="/applied-scholarship-list"
                element={<AppliedScholarshipList />}
              />
              <Route
                path="/scholarship-list/:scholarshipId"
                element={<ScholarshipDetail />}
              />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<Navigate to="/" />} />
              {/* <Route path="/*" element={<Landing />} /> */}
            </Routes>
          ) : status === "alumni" ? (
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/auth/*" element={<Registeration />}>
                <Route path="verify-email" element={<EmailVerification />} />
              </Route>

              <Route
                path="/my-scholarship-list"
                element={<AlumniScholarshipList />}
              />
              <Route
                path="/my-scholarship-list/:scholarshipId"
                element={<AlumniScholarshipDetail />}
              />
              <Route
                path="alumni/user-list/:scholarshipId"
                element={<UserList />}
              />
              <Route
                path="alumni/user-details/:userId/:scholarshipId"
                element={<UserProfile />}
              />
              <Route path="/profile" element={<AlumniProfile />} />
              <Route path="*" element={<Navigate to="/profile" />} />
            </Routes>
          ) : (
            <Routes>
              <Route path="/auth/*" element={<Registeration />}>
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<Signup />} />
                <Route path="forgot-password" element={<ForgotPassword />} />
                <Route
                  path="reset-password/:token"
                  element={<ResetPassword />}
                />
              </Route>
              <Route path="/" element={<Landing />} />
              <Route path="*" element={<Navigate to="/auth/login" />} />
            </Routes>
          )}

          {!location.pathname.includes("/auth") && <Footer />}
          <ToastContainer />
        </Suspense>
      )}
    </>
  );
}

export default App;
