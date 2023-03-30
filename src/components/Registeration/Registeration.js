import React from "react";
import classes from "./Registeration.module.css";
import { Outlet } from "react-router-dom";

const Registeration = () => {
  return (
    <div className={classes.main}>
      <div className={classes.leftDiv}></div>
      <div className={classes.rightDiv}>
        <Outlet />
      </div>
    </div>
  );
};
export default Registeration;
