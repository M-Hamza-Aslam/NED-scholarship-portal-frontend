import React from "react";
import { InputBase, IconButton, Paper } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import SearchIcon from "@mui/icons-material/Search";

import classes from "../InitialDisplay.module.css";

const InitialDisplay = ({ title, setFilters }) => {
  return (
    <div className={classes["initial-display"]}>
      <div className={classes["initial-text"]}>
        {/* <div className={classes["masked-logo"]}>
          <img src={logoMask} alt="Masked Logo" />
        </div> */}
        <h1>{title} </h1>
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
            <Paper
              component="form"
              onSubmit={(event) => {
                event.preventDefault();
                setFilters(
                  (prevMap) =>
                    new Map(prevMap.set("title", event.target[0].value))
                );
              }}
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                backgroundColor: "transparent",
                color: "white",
                border: "1px solid white",
                borderRadius: "100px",
                width: 300,
                maxWidth: "90%",
              }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1, color: "white" }}
                placeholder={`Search ${title}`}
                inputProps={{ "aria-label": `search ${title}` }}
                onChange={(event) =>
                  !event.target.value &&
                  setFilters((prevState) => new Map(prevState.set("title", "")))
                }
                // onChange={filterByKeywordHandler}
                // inputRef={searchRef}
              />
              <IconButton
                type="submit"
                sx={{ p: "10px", color: "white" }}
                aria-label="menu"
              >
                <SearchIcon />
              </IconButton>
            </Paper>
            <FormControl sx={{ height: "50px !important", maxWidth: "90%" }}>
              <InputLabel
                sx={{ color: "#7AA09D !important", top: "-3px" }}
                id="status-select-label"
              >
                Filter By Status
              </InputLabel>
              <Select
                labelId="status-select-label"
                id="demo-simple-select"
                label="Filter By Status"
                className={classes.filter}
                onChange={(event) =>
                  setFilters(
                    (prevMap) =>
                      new Map(prevMap.set("status", event.target.value))
                  )
                }
                sx={{ maxWidth: "100%" }}
              >
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="awaiting">Awaiting</MenuItem>
                <MenuItem value="declined">Declined</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ height: "50px !important", maxWidth: "90%" }}>
              <InputLabel
                sx={{ color: "#7AA09D !important", top: "-3px" }}
                id="type-select-label"
              >
                Filter By Type
              </InputLabel>
              <Select
                labelId="type-select-label"
                id="demo-simple-select"
                label="Filter By Type"
                className={classes.filter}
                onChange={(event) =>
                  setFilters(
                    (prevMap) =>
                      new Map(prevMap.set("type", event.target.value))
                  )
                }
                sx={{ maxWidth: "100%" }}
              >
                <MenuItem value="merit">Merit</MenuItem>
                <MenuItem value="need">Need</MenuItem>
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
