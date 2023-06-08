import classes from "./SideBar.module.css";
import { useSelector } from "react-redux";
import { useState } from "react";
import LinearProgressWithLabel from "./ProgressBar";
import { useEffect } from "react";
import { BACKEND_DOMAIN } from "../../../../config";

// const myImg = require("../../images/myimg.jpeg");
import defaultProfileImg from "../../../../images/defaultProfileImg.jpg";

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

  useEffect(() => {
    if (profileImg !== "") {
      fetch(`${BACKEND_DOMAIN}/admin/alumniProfileImg?userId=${userId}`, {
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
    </div>
  );
};
export default SideBar;
