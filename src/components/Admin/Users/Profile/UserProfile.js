import classes from "./UserProfile.module.css";
import SideBar from "./SideBar";
import React, { useEffect, useState } from "react";
import FamilyDetails from "./FamilyDetails/FamilyDetails";
import ListOfDependants from "./ListOfDependants/ListOfDependants";
import Education from "./Education/Education";
import { Fragment } from "react";
import { BACKEND_DOMAIN } from "../../../../config";
import useLoader from "../../../../Hooks/UseLoader";
import { useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import { useParams } from "react-router-dom";
import InitialDisplay from "./InitialDisplay";
import { postChangeUserStatus } from "../../../../api";
import { toast } from "react-toastify";
import OtherRequirements from "./OtherRequirements/OtherRequirements";

const PersonalInfo = React.lazy(() => import("./PersonalInfo/PersonalInfo"));

const UserProfile = (props) => {
  //scholarship ID

  const [loading, setLoading] = useState(true);
  const [userDetails, setUserDetails] = useState({});
  const userRole = useSelector((state) => state.user.user.userRole);
  const token = useSelector((state) =>
    userRole === "admin" ? state.admin.admin.token : state.user.user.token
  );
  const { userId, scholarshipId } = useParams();

  const changeUserStatusHandler = async (event) => {
    const response = await postChangeUserStatus(
      userId,
      scholarshipId,
      event.target.value,
      token
    );

    if (response.ok) {
      toast.success("User Status Changed Successfully!");
    } else {
      const { message } = await response.json();
      toast.error(
        message || "Some unexpected error has occurred, please try again."
      );
    }
  };

  useEffect(() => {
    setLoading(true);
    fetch(
      `${BACKEND_DOMAIN}/${userRole}/user-data?userId=${userId}&scholarshipId=${scholarshipId}`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    )
      .then((response) => {
        if (response.status !== 200) {
          const error = new Error("Data fetching failed!");
          error.status = response.status;
          // handleLoader(false);
          setLoading(false);
          throw error;
        }
        return response.json();
      })
      .then((userData) => {
        console.log(userData);
        setUserDetails(userData.userDetails);
        // handleLoader(false);
        setLoading(false);
      });
  }, []);

  const [selectedSection, setSelectedSection] = useState("personalInfo");

  return (
    <>
      {loading ? (
        <div className="loadingDiv">
          <CircularProgress />
          <h5>Please Wait...</h5>
        </div>
      ) : (
        <div className={classes.container}>
          <InitialDisplay
            onChange={changeUserStatusHandler}
            title="User Details"
          />
          <div className={classes.mainDiv}>
            <div className={classes.leftDiv}>
              <SideBar
                selectedSection={selectedSection}
                setSelectedSection={setSelectedSection}
                data={{ ...userDetails.sideBar, userId: userDetails.userId }}
              />
            </div>
            <div className={classes.rightDiv}>
              <Fragment>
                {selectedSection === "personalInfo" && (
                  <PersonalInfo data={userDetails.personalInfo} />
                )}
                {selectedSection === "familyInfo" && (
                  <FamilyDetails data={userDetails.familyDetails} />
                )}
                {selectedSection === "educationalInfo" && (
                  <Education
                    data={userDetails.education}
                    userId={userDetails.userId}
                  />
                )}
                {selectedSection === "listOfDependants" && (
                  <ListOfDependants data={userDetails.dependantDetails} />
                )}
                {selectedSection === "OtherRequirements" && (
                  <OtherRequirements data={userDetails.otherRequirements} />
                )}
              </Fragment>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default UserProfile;
