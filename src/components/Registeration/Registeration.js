import React from "react";
import classes from "./Registeration.module.css";
import { Outlet } from "react-router-dom";
import { Fragment } from "react";
import useLoader from "../../Hooks/UseLoader";
const Registeration = () => {
  const { LoadingComponent, loader, handleLoader } = useLoader();

  return (
    <Fragment>
      {loader && LoadingComponent}
      <div className={classes.main}>
        <div className={classes.leftDiv}></div>
        <div className={classes.rightDiv}>
          <Outlet context={[handleLoader]} />
        </div>
      </div>
    </Fragment>
  );
};
export default Registeration;
