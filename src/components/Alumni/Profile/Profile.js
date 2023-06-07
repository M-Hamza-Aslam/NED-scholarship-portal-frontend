import classes from "./Profile.module.css";
import SideBar from "./SideBar";
import PersonalInfo from "./PersonalInfo/PersonalInfo";
import InitialDisplay from "../../Admin/Users/UserListComponents/InitialDisplay";

const Profile = () => {
  return (
    <div className={classes.container}>
      <InitialDisplay title="My profile" />
      <div className={classes.mainDiv}>
        <div className={classes.leftDiv}>
          <SideBar />
        </div>
        <div className={classes.rightDiv}>
          <PersonalInfo />
        </div>
      </div>
    </div>
  );
};
export default Profile;
