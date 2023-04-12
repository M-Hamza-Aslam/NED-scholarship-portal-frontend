import classes from "./Profile.module.css";
import SideBar from "./SideBar";
import { useState } from "react";
import PersonalInfo from "./PersonalInfo/PersonalInfo";
import FamilyDetails from "./FamilyDetails/FamilyDetails";
import EducationalDetails from "./EducationalDetails/EducationalDetails";
import ListOfDependants from "./ListOfDependants/ListOfDependants";

const Profile = () => {
  const [selectedSection, setSelectedSection] = useState("personalInfo");
  const [editMode, setEditMode] = useState(false);
  return (
    <div className={classes.container}>
      <div className={classes.mainDiv}>
        <div className={classes.leftDiv}>
          <SideBar
            selectedSection={selectedSection}
            setSelectedSection={setSelectedSection}
            setEditMode={setEditMode}
          />
        </div>
        <div className={classes.rightDiv}>
          {selectedSection === "personalInfo" && <PersonalInfo />}
          {selectedSection === "familyInfo" && <FamilyDetails />}
          {selectedSection === "educationalInfo" &&
            (editMode ? (
              <EducationalDetails setEditMode={setEditMode} editMode={true} />
            ) : (
              <EducationalDetails setEditMode={setEditMode} editMode={false} />
            ))}
          {selectedSection === "listOfDependants" && (
            <ListOfDependants setEditMode={setEditMode} />
          )}
        </div>
      </div>
    </div>
  );
};
export default Profile;
