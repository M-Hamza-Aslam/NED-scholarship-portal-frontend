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

const PersonalInfo = React.lazy(() => import("./PersonalInfo/PersonalInfo"));

const UserProfile = (props) => {
  const [loading, setLoading] = useState(true);
  const [userDetails, setUserDetails] = useState({});
  const token = useSelector((state) => state.admin.admin.token);
  // const {userId} = useParams()
  // const userId = props.userId;
  const userId = "6443708ae57a981ed04609bc";

  // const { LoadingComponent, loader, handleLoader } = useLoader();
  //fetch data from backend
  useEffect(() => {
    console.log("starting");
    // handleLoader(true);
    setLoading(true);
    fetch(`${BACKEND_DOMAIN}/admin/user-data?userId=${userId}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
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
              </Fragment>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default UserProfile;
