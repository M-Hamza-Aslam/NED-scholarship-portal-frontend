import classes from "./Profile.module.css";
import SideBar from "./SideBar";
import { useState } from "react";
import PersonalInfo from "./PersonalInfo/PersonalInfo";
import FamilyDetails from "./FamilyDetails/FamilyDetails";
import ListOfDependants from "./ListOfDependants/ListOfDependants";
import Education from "./Education/Education";
import { Fragment } from "react";
import InitialDisplay from "../Admin/Users/UserListComponents/InitialDisplay";
import { useSelector } from "react-redux";

const Profile = () => {
  const [selectedSection, setSelectedSection] = useState("personalInfo");

  return (
    <div className={classes.container}>
      <InitialDisplay title="My profile" />
      <div className={classes.mainDiv}>
        <div className={classes.leftDiv}>
          <SideBar
            selectedSection={selectedSection}
            setSelectedSection={setSelectedSection}
          />
        </div>
        <div className={classes.rightDiv}>
          <Fragment>
            {selectedSection === "personalInfo" && <PersonalInfo />}
            {selectedSection === "familyInfo" && <FamilyDetails />}
            {selectedSection === "educationalInfo" && <Education />}
            {selectedSection === "listOfDependants" && <ListOfDependants />}
          </Fragment>
        </div>
      </div>
    </div>
  );
};
export default Profile;
