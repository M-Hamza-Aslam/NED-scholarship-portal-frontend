import React from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Typography } from "@mui/material";

import classes from "./UserCards.module.css";
import UserImage from "./UserImage";
import { useSelector } from "react-redux";
import { postUserReport } from "../../../../api";

const UserCards = ({ userList }) => {
  const userRole = useSelector((state) => state.user.user.userRole);
  const token = useSelector((state) =>
    userRole === "admin" ? state.admin.admin.token : state.user.user.token
  );
  const scholarshipId = useParams().scholarshipId;

  const viewUserReportHandler = async (id) => {
    const report = await postUserReport(id, token);
    const fileUrl = await URL.createObjectURL(report);
    window.open(fileUrl);
  };
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
                <Link to={`/${userRole}/user-details/${user._id}`}>
                  <Typography variant="h5" component="h2">
                    {user.firstName} {user.lastName}
                  </Typography>
                </Link>
                <p className={classes.status} style={{ fontWeight: "bold" }}>
                  Status:{" "}
                  <span className={classes[user.status]}>{user.status}</span>
                </p>
                <a
                  className={classes.report}
                  target="_blank"
                  onClick={() => viewUserReportHandler(user._id)}
                >
                  <span>View Report</span>
                </a>
                {/* <Button variant="outlined">Read Details</Button> */}
                <Link
                  to={`/${userRole}/user-details/${user._id}/${scholarshipId}`}
                >
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
