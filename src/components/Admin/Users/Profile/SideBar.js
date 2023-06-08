import classes from "./SideBar.module.css";
import PermContactCalendarOutlinedIcon from "@mui/icons-material/PermContactCalendarOutlined";
import FamilyRestroomOutlinedIcon from "@mui/icons-material/FamilyRestroomOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import ListAltIcon from "@mui/icons-material/ListAlt";
import LinearProgressWithLabel from "../../../Profile/ProgressBar";
import defaultProfileImg from "../../../../images/defaultProfileImg.jpg";
import { useState, useEffect } from "react";
import { BACKEND_DOMAIN } from "../../../../config";
import { useSelector } from "react-redux";

const SideBar = (props) => {
  const {
    userId,
    firstName,
    lastName,
    email,
    phoneNumber,
    profileStatus,
    profileImg,
  } = props.data;
  const [imageUrl, setImageUrl] = useState(defaultProfileImg);
  const token = useSelector((state) => state.admin.admin.token);

  const selectedSection = props.selectedSection;
  const setSelectedSection = props.setSelectedSection;

  const sectionSelectionHandler = (sectionName) => {
    if (selectedSection !== sectionName) {
      setSelectedSection(sectionName);
    }
  };

  useEffect(() => {
    if (profileImg !== "") {
      fetch(`${BACKEND_DOMAIN}/admin/userProfileImg?userId=${userId}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
        .then((res) => res.blob())
        .then((blobData) => URL.createObjectURL(blobData))
        .then((imageUrl) => setImageUrl(imageUrl))
        .catch((error) => console.log(error));
    }
  }, []);

  return (
    <div className={classes.mainDiv}>
      <h2>Profile Status:</h2>
      <LinearProgressWithLabel value={profileStatus} />
      <div className={classes.infoBar}>
        <div className={classes.imgDiv}>
          <img src={imageUrl} alt="profile" />
          <div className={classes.nameDiv}>
            <h3>{firstName}</h3>
            <h3>{lastName}</h3>
          </div>
        </div>
        <div className={classes.infoDiv}>
          <h5>EMAIL:</h5>
          <p>{email}</p>
        </div>
        <div className={classes.infoDiv}>
          <h5>PHONE:</h5>
          <p>{phoneNumber}</p>
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
        {}
        <button
          className={`${classes.sectionBtn} ${
            selectedSection === "OtherRequirements" && classes.active
          }`}
          onClick={() => sectionSelectionHandler("OtherRequirements")}
        >
          <div className={classes.sectionName}>
            <SchoolOutlinedIcon />
            <h5>Requirements</h5>
          </div>
          {selectedSection === "OtherRequirements" && (
            <KeyboardArrowDownOutlinedIcon />
          )}
        </button>
      </div>
    </div>
  );
};
export default SideBar;
