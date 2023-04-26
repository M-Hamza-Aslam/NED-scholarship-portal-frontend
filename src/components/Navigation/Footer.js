import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/userSlice";
import { adminActions } from "../../store/adminSlice";
import logo from "../../assets/images/logo.png";
import logoMask from "../../assets/images/logo-mask.png";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MailIcon from "@mui/icons-material/Mail";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";

import classes from "./Footer.module.css";

const Footer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userRole = useSelector((state) => state.user.user.userRole);
  const footerNavigationHandler = (event) => {
    navigate(`/${event.target.id}`);
    window.scrollTo(0, 0);
  };

  const contactFormNavigationHandler = () => {
    navigate("/");
    setTimeout(() => {
      document
        .getElementById("contact")
        .scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(userActions.clearUserData());
    dispatch(adminActions.clearAdminData());
    navigate("/auth/login");
  };

  return (
    <Fragment>
      <div className={classes.footer}>
        {/* <div className={classes["masked-logo"]}>
          <img src={logoMask} alt="" />
        </div> */}
        <img style={{ margin: "1rem 0" }} src={logo} alt="" />
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s,
        </p>
        <div className={classes["footer-links"]}>
          {userRole === "student" ? (
            <div>
              <span id="" onClick={footerNavigationHandler}>
                Home
              </span>
              <span id="scholarship-list" onClick={footerNavigationHandler}>
                Scholarship List
              </span>
              <span id="profile" onClick={footerNavigationHandler}>
                Profile
              </span>
            </div>
          ) : (
            <div>
              <span
                id="admin/scholarship-list"
                onClick={footerNavigationHandler}
              >
                Home
              </span>
              <span
                id="admin/create-scholarship"
                onClick={footerNavigationHandler}
              >
                Create Scholarship
              </span>
              <span onClick={handleLogout}>Logout</span>
            </div>
          )}

          {userRole === "student" && (
            <div>
              <span
                id="applied-scholarship-list"
                onClick={footerNavigationHandler}
                className={classes["stick"]}
              >
                My Scholarships
              </span>
              <span onClick={contactFormNavigationHandler}>Contact</span>
              <span id="applied-scholarship-list" onClick={handleLogout}>
                Logout
              </span>
            </div>
          )}
        </div>
        <div className={classes.contact}>
          <span>
            <PhoneIcon sx={{ margin: "0 15px" }} />
            (92-21) 99261261-8
          </span>
          <span>
            <LocationOnIcon sx={{ margin: "0 10px" }} />
            24.9324° N, 67.1127° E
          </span>
          <span>
            <MailIcon sx={{ margin: "0 15px" }} />
            registrar@neduet.edu.pk
          </span>
        </div>
        <div className={classes["social-handles"]}>
          <FacebookIcon />
          <YouTubeIcon />
        </div>
      </div>
      <div className={classes.copyright}>
        <p>NEDSP © 2023, All rights reserved - Powered by DarkHorse Corp.</p>
      </div>
    </Fragment>
  );
};

export default Footer;
