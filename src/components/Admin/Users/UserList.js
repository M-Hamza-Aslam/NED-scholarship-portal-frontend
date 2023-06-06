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
  const token = useSelector((state) => state.admin.admin.token);
  const role = useSelector((state) => state.user.user.userRole);
  const { data, error, isLoading } = useSWR(
    [
      token ? `/admin/appliedUsersList?scholarshipId=${scholarshipId}` : null,
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
