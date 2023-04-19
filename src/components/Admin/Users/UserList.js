import React, { useState } from "react";
import InitialDisplay from "./UserListComponents/InitialDisplay";
import UserCards from "./UserListComponents/UserCards";

import classes from "./UserList.module.css";

const UserList = () => {
  const [userList, setUserList] = useState([
    {
      image: "https://avatars.githubusercontent.com/u/73195115?v=4",
      name: "Muhammad Hamza Aslam",
      status: "rejected",
    },
    {
      image:
        "https://media.licdn.com/dms/image/C4D03AQHOWbtZ-BHXgA/profile-displayphoto-shrink_800_800/0/1663450693585?e=1687392000&v=beta&t=okFeDPj4AG0jnBc6VK20pGcdrkKZ1OhKocE5Vrtffzg",
      name: "Muhammad Usman Gauhar Khan",
      status: "accepted",
    },
    {
      image:
        "https://media.licdn.com/dms/image/D4D03AQED2-O0tD9bqg/profile-displayphoto-shrink_800_800/0/1676528975085?e=1687392000&v=beta&t=ZRHLR3v0y6neAVK8tTxLibDtXVyJCFoC4Ftw0Mld6k8",
      name: "Muhammad Jawwad Sheikh",
      status: "pending",
    },
    {
      image: "https://admin.gundogclub.pk/public/judge_images/1640425219.png",
      name: "Colonel (Retd) K. M. Roy",
      status: "rejected",
    },
    {
      image: "https://admin.gundogclub.pk/public/judge_images/1640425720.jpg",
      name: "Mirza Saif Baig",
      status: "rejected",
    },
    {
      image:
        "https://admin.gundogclub.pk/public/judge_images/1640426532.Imran%20Hussain.jpg",
      name: "Imran Hussain, Pakistan",
      status: "rejected",
    },
  ]);

  return (
    <div className={classes["user-list"]}>
      <InitialDisplay title="User List" />
      <UserCards userList={userList} />
    </div>
  );
};

export default UserList;
