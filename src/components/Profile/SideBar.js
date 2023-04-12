import classes from "./SideBar.module.css";
import PermContactCalendarOutlinedIcon from "@mui/icons-material/PermContactCalendarOutlined";
import FamilyRestroomOutlinedIcon from "@mui/icons-material/FamilyRestroomOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { useSelector } from "react-redux";
import { useState } from "react";
import LinearProgressWithLabel from "./ProgressBar";
import { useEffect } from "react";

const myImg = require("../../images/myimg.jpeg");

const SideBar = (props) => {
  const userData = useSelector((state) => {
    return {
      firstName: state.user.user.firstName,
      lastName: state.user.user.lastName,
      email: state.user.user.email,
      phoneNumber: state.user.user.phoneNumber,
      profileStatus: state.user.user.profileStatus,
    };
  });
  const [progress, setProgress] = useState(userData.profileStatus);
  const selectedSection = props.selectedSection;
  const setSelectedSection = props.setSelectedSection;
  const setEditMode = props.setEditMode;

  const sectionSelectionHandler = (sectionName) => {
    if (selectedSection !== sectionName) {
      setEditMode(false);
      setSelectedSection(sectionName);
    }
  };
  useEffect(() => {
    setProgress(userData.profileStatus);
  }, [userData.profileStatus]);
  return (
    <div className={classes.mainDiv}>
      <h2>Profile Status:</h2>
      <LinearProgressWithLabel value={progress} />
      <div className={classes.infoBar}>
        <div className={classes.imgDiv}>
          <img src={myImg} alt="profile" />
          <div className={classes.nameDiv}>
            <h3>{userData.firstName}</h3>
            <h3>{userData.lastName}</h3>
          </div>
        </div>
        <div className={classes.infoDiv}>
          <h5>EMAIL:</h5>
          <p>{userData.email}</p>
        </div>
        <div className={classes.infoDiv}>
          <h5>PHONE:</h5>
          <p>{userData.phoneNumber}</p>
        </div>
      </div>
      <div className={classes.sectionsDiv}>
        <button
          className={`${classes.sectionBtn} ${
            selectedSection === "personalInfo" && classes.active
          }`}
          onClick={() => sectionSelectionHandler("personalInfo")}
        >
          <div className={classes.sectionName}>
            <PermContactCalendarOutlinedIcon />
            <h5>Personal</h5>
          </div>
          {selectedSection === "personalInfo" && (
            <KeyboardArrowDownOutlinedIcon />
          )}
        </button>
        <button
          className={`${classes.sectionBtn} ${
            selectedSection === "familyInfo" && classes.active
          }`}
          onClick={() => sectionSelectionHandler("familyInfo")}
        >
          <div className={classes.sectionName}>
            <FamilyRestroomOutlinedIcon />
            <h5>Family</h5>
          </div>
          {selectedSection === "familyInfo" && (
            <KeyboardArrowDownOutlinedIcon />
          )}
        </button>
        <button
          className={`${classes.sectionBtn} ${
            selectedSection === "listOfDependants" && classes.active
          }`}
          onClick={() => sectionSelectionHandler("listOfDependants")}
        >
          <div className={classes.sectionName}>
            <ListAltIcon />
            <h5>Dependants</h5>
          </div>
          {selectedSection === "listOfDependants" && (
            <KeyboardArrowDownOutlinedIcon />
          )}
        </button>
        <button
          className={`${classes.sectionBtn} ${
            selectedSection === "educationalInfo" && classes.active
          }`}
          onClick={() => sectionSelectionHandler("educationalInfo")}
        >
          <div className={classes.sectionName}>
            <SchoolOutlinedIcon />
            <h5>Education</h5>
          </div>
          {selectedSection === "educationalInfo" && (
            <KeyboardArrowDownOutlinedIcon />
          )}
        </button>
      </div>
    </div>
  );
};
export default SideBar;
