import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Typography } from "@mui/material";

import classes from "./UserCards.module.css";
import UserImage from "./UserImage";
import { useSelector } from "react-redux";

const UserCards = ({ userList }) => {
  const token = useSelector((state) => state.admin.admin.token);
  return (
    <main className={classes["user-list-main"]}>
      <div className={classes["user-list-section"]}>
        <div className={classes["user-list"]}>
          {userList?.length > 0 ? (
            userList.map((user, index) => (
              <div key={index} className={classes["user-card"]}>
                <div className={classes["user-image"]}>
                  <UserImage userId={user._id} token={token} />
                </div>
                <Link to={`/admin/user-details/${user._id}`}>
                  <Typography variant="h5" component="h2">
                    {user.firstName} {user.lastName}
                  </Typography>
                </Link>
                <p className={classes.status} style={{ fontWeight: "bold" }}>
                  Status:{" "}
                  <span className={classes[user.status]}>{user.status}</span>
                </p>
                {/* <Button variant="outlined">Read Details</Button> */}
                <Link to={`/admin/user-details/${user._id}`}>
                  <Button
                    variant="outlined"
                    className={classes.details}
                    // sx={{
                    //   borderColor: "#0f2d25",
                    //   backgroundColor: "white",
                    //   color: "#0f2d25",
                    //   "&:hover": {
                    //     backgroundColor: "#18544e",
                    //     borderColor: "#0f2d25",
                    //     color: "white",
                    //   },
                    // }}
                    autoFocus
                  >
                    Show Details
                  </Button>
                </Link>
              </div>
            ))
          ) : (
            <div className="loading">
              <Typography
                variant="h4"
                component="h1"
                sx={{ textAlign: "center" }}
              >
                No Users Found in this Scholarship!
              </Typography>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default UserCards;
