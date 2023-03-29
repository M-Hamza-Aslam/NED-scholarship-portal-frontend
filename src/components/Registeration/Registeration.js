import React from "react";
// import Login from "./Login";
import classes from "./Registeration.module.css";
// import Signup from "./Signup";
// import ForgotPassword from "./ForgotPassword";
import { Outlet } from "react-router-dom";

const Registeration = () => {
  // const [showSignupForm, setShowSignupForm] = useState(false);
  // const [forgotPassword, setForgotPassword] = useState(false);
  return (
    <div className={classes.main}>
      <div className={classes.leftDiv}></div>
      <div className={classes.rightDiv}>
        <Outlet />
        {/* {showSignupForm ? (
          <Signup setSignupForm={setShowSignupForm} />
        ) : forgotPassword ? (
          <ForgotPassword setForgotPassword={setForgotPassword} />
        ) : (
          <Login
            setSignupForm={setShowSignupForm}
            setForgotPassword={setForgotPassword}
          />
        )} */}
      </div>
    </div>
  );
};
export default Registeration;
