import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";

import classes from "./InitialDisplay.module.css";

const InitialDisplay = ({ title, type, typeHandler }) => {
  return (
    <div className={classes["initial-display"]}>
      <div className={classes["initial-text"]}>
        {/* <div className={classes["masked-logo"]}>
          <img src={logoMask} alt="Masked Logo" />
        </div> */}
        <h1>{title}</h1>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </p>
        <div className={classes["stud-footer"]}>
          <span className={classes["social-handles"]}>
            <FacebookIcon />
            <YouTubeIcon />
          </span>
          <div>
            <FormControl sx={{ height: "50px !important", maxWidth: "90%" }}>
              <InputLabel
                sx={{ color: "#7AA09D !important", top: "-3px" }}
                id="demo-simple-select-label"
              >
                Select Type
              </InputLabel>
              {type && (
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Select Type"
                  className={classes.filter}
                  value={type}
                  // inputRef={statusRef}
                  onChange={(event) => typeHandler(event.target.value)}
                  sx={{ maxWidth: "100%" }}
                >
                  <MenuItem value="merit">Merit</MenuItem>
                  <MenuItem value="need">Need</MenuItem>
                </Select>
              )}
            </FormControl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InitialDisplay;
