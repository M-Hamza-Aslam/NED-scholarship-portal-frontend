import classes from "./SideBar.module.css";
import PermContactCalendarOutlinedIcon from "@mui/icons-material/PermContactCalendarOutlined";
import FamilyRestroomOutlinedIcon from "@mui/icons-material/FamilyRestroomOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import ListAltIcon from "@mui/icons-material/ListAlt";
const myImg = require("../../images/myimg.jpeg");

const SideBar = (props) => {
  const selectedSection = props.selectedSection;
  const setSelectedSection = props.setSelectedSection;
  const setEditMode = props.setEditMode;

  const sectionSelectionHandler = (sectionName) => {
    if (selectedSection !== sectionName) {
      setEditMode(false);
      setSelectedSection(sectionName);
    }
  };
  return (
    <div className={classes.mainDiv}>
      <h2>PERSONAL INFO</h2>
      <div className={classes.imgDiv}>
        <img src={myImg} alt="profile" />
        <div className={classes.nameDiv}>
          <h3>Muhammad Hamza</h3>
          <h6>HAMZA4300420@cloud.neduet.edu.pk</h6>
        </div>
      </div>
      <h5>EMAIL:</h5>
      <p>HAMZA4300420@cloud.neduet.edu.pk</p>
      <h5>PHONE:</h5>
      <p>923130260405</p>
      <div className={classes.sectionsDiv}>
        <button
          className={`${classes.sectionBtn} ${
            selectedSection === "personalInfo" && classes.active
          }`}
          onClick={() => sectionSelectionHandler("personalInfo")}
        >
          <div className={classes.sectionName}>
            <PermContactCalendarOutlinedIcon />
            <h5>Personal Information</h5>
          </div>
          {selectedSection === "personalInfo" && <ChevronRightOutlinedIcon />}
        </button>
        <button
          className={`${classes.sectionBtn} ${
            selectedSection === "familyInfo" && classes.active
          }`}
          onClick={() => sectionSelectionHandler("familyInfo")}
        >
          <div className={classes.sectionName}>
            <FamilyRestroomOutlinedIcon />
            <h5>Family Details</h5>
          </div>
          {selectedSection === "familyInfo" && <ChevronRightOutlinedIcon />}
        </button>
        <button
          className={`${classes.sectionBtn} ${
            selectedSection === "listOfDependants" && classes.active
          }`}
          onClick={() => sectionSelectionHandler("listOfDependants")}
        >
          <div className={classes.sectionName}>
            <ListAltIcon />
            <h5>List of Dependants</h5>
          </div>
          {selectedSection === "listOfDependants" && (
            <ChevronRightOutlinedIcon />
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
            <h5>Educational Details</h5>
          </div>
          {selectedSection === "educationalInfo" && (
            <ChevronRightOutlinedIcon />
          )}
        </button>
      </div>
    </div>
  );
};
export default SideBar;
