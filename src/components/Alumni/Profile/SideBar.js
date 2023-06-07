import classes from "./SideBar.module.css";
import { useSelector } from "react-redux";
import { useState } from "react";
import LinearProgressWithLabel from "./ProgressBar";
import { useEffect } from "react";
import { BACKEND_DOMAIN } from "../../../config";

// const myImg = require("../../images/myimg.jpeg");
import defaultProfileImg from "../../../images/defaultProfileImg.jpg";

const SideBar = () => {
  const userData = useSelector((state) => {
    return {
      firstName: state.user.user.firstName,
      lastName: state.user.user.lastName,
      email: state.user.user.email,
      phoneNumber: state.user.user.phoneNumber,
      profileStatus: state.user.user.profileStatus,
      profileImg: state.user.user.profileImg,
      token: state.user.user.token,
    };
  });
  const [progress, setProgress] = useState(userData.profileStatus);
  const [imageUrl, setImageUrl] = useState(defaultProfileImg);
  useEffect(() => {
    if (userData.profileImg !== "") {
      fetch(BACKEND_DOMAIN + "/alumni/profileImg", {
        headers: {
          Authorization: "Bearer " + userData.token,
        },
      })
        .then((res) => res.blob())
        .then((blobData) => URL.createObjectURL(blobData))
        .then((imageUrl) => setImageUrl(imageUrl))
        .catch((error) => console.log(error));
    }
  }, [userData.profileImg, userData.token]);

  useEffect(() => {
    setProgress(userData.profileStatus);
  }, [userData.profileStatus]);

  return (
    <div className={classes.mainDiv}>
      <h2>Profile Status:</h2>
      <LinearProgressWithLabel value={progress} />
      <div className={classes.infoBar}>
        <div className={classes.imgDiv}>
          <img src={imageUrl} alt="profile" />
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
    </div>
  );
};
export default SideBar;
