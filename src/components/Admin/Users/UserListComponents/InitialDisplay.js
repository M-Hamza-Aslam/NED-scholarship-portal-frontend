import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";

import classes from "../../../Scholarship/InitialDisplay.module.css";

const InitialDisplay = ({ title }) => {
  return (
    <div className={classes["initial-display"]}>
      <div className={classes["initial-text"]}>
        {/* <div className={classes["masked-logo"]}>
          <img src={logoMask} alt="Masked Logo" />
        </div> */}
        <h1>{title}</h1>

        <div className={classes["stud-footer"]}>
          <span className={classes["social-handles"]}>
            <FacebookIcon />
            <YouTubeIcon />
          </span>
          <div style={{ margin: "0 2rem" }}>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InitialDisplay;
