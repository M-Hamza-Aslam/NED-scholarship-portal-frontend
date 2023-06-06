import React from "react";
import { InputBase, IconButton, Paper } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import SearchIcon from "@mui/icons-material/Search";

import classes from "./InitialDisplay.module.css";

const InitialDisplay = ({ onChange, title }) => {
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
                Change Status
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Change Status"
                className={classes.filter}
                sx={{ maxWidth: "100%" }}
                onChange={onChange}
              >
                <MenuItem value="awaiting">Awaiting</MenuItem>
                <MenuItem value="approved">Approved</MenuItem>
                <MenuItem value="declined">Declined</MenuItem>
              </Select>
            </FormControl>
            {/* <button>SEARCH</button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InitialDisplay;
