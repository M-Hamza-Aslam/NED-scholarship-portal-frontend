import classes from "./Profile.module.css";
import SideBar from "./SideBar";
// import PersonalInfo from "./PersonalInfo/PersonalInfo";
import InitialDisplay from "../../../Admin/Users/UserListComponents/InitialDisplay";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { BACKEND_DOMAIN } from "../../../../config";
import { CircularProgress } from "@mui/material";

const PersonalInfo = React.lazy(() => import("./PersonalInfo/PersonalInfo"));

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [alumniDetails, setAlumniDetails] = useState({});
  const token = useSelector((state) => state.admin.admin.token);
  const { alumniId, scholarshipId } = useParams();
  useEffect(() => {
    setLoading(true);
    fetch(`${BACKEND_DOMAIN}/admin/alumni-data?userId=${alumniId}`, {
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
        setAlumniDetails(userData.userDetails);
        // handleLoader(false);
        setLoading(false);
      });
  }, []);

  return (
    <>
      {loading ? (
        <div className="loadingDiv">
          <CircularProgress />
          <h5>Please Wait...</h5>
        </div>
      ) : (
        <div className={classes.container}>
          <InitialDisplay title="Alumni Details" />
          <div className={classes.mainDiv}>
            <div className={classes.leftDiv}>
              <SideBar
                data={{
                  ...alumniDetails.sideBar,
                  userId: alumniDetails.userId,
                }}
              />
            </div>
            <div className={classes.rightDiv}>
              <PersonalInfo data={alumniDetails.personalInfo} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Profile;
