import React, { useState } from "react";
import InitialDisplay from "./UserListComponents/InitialDisplay";
import UserCards from "./UserListComponents/UserCards";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { globalFetcher } from "../../../api";
import useSWR from "swr";

import classes from "./UserList.module.css";

const UserList = () => {
  const scholarshipId = useParams().scholarshipId;
  const userRole = useSelector((state) => state.user.user.userRole);
  const token = useSelector((state) =>
    userRole === "admin" ? state.admin.admin.token : state.user.user.token
  );
  const { data, error, isLoading } = useSWR(
    [
      token
        ? `/${userRole}/appliedUsersList?scholarshipId=${scholarshipId}`
        : null,
      token,
    ],
    ([url, token]) => globalFetcher(url, token)
  );

  return (
    <div className={classes["user-list"]}>
      <InitialDisplay title="User List" />
      <UserCards userList={data?.users} />
    </div>
  );
};

export default UserList;
