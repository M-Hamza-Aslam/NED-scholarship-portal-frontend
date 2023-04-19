import React from "react";
import { Link } from "react-router-dom";
import { Button, Typography } from "@mui/material";

import classes from "./UserCards.module.css";

const UserCards = ({ userList }) => {
  return (
    <main className={classes["user-list-main"]}>
      <div className={classes["user-list-section"]}>
        <div className={classes["user-list"]}>
          {userList.map((user, index) => (
            <div key={index} className={classes["user-card"]}>
              <div className={classes["user-image"]}>
                <img src={user.image} alt={user.name} />
              </div>
              <Link to={`/users-list/${user.name}`}>
                <Typography variant="h5" component="h2">
                  {user.name}
                </Typography>
              </Link>
              <p className={classes.status} style={{ fontWeight: "bold" }}>
                Status:{" "}
                <span className={classes[user.status]}>{user.status}</span>
              </p>
              {/* <Button variant="outlined">Read Details</Button> */}
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
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default UserCards;
