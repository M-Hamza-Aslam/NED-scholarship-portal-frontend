import React, { useState } from "react";
import Login from "./Login";
import classes from "./Registeration.module.css";
import Signup from "./Signup";

const Registeration = () => {
  const [showSignupForm, setShowSignupForm] = useState(false);
  return (
    <div className={classes.main}>
      <div className={classes.leftDiv}></div>
      <div className={classes.rightDiv}>
        {showSignupForm ? (
          <Signup setSignupForm={setShowSignupForm} />
        ) : (
          <Login setSignupForm={setShowSignupForm} />
        )}
      </div>
    </div>
  );
};
export default Registeration;
