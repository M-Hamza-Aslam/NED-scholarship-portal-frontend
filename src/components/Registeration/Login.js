import React from "react";
import classes from "./Login.module.css";
import {
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormControl,
  FormHelperText,
  Button,
} from "@mui/material";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { useState } from "react";
const logo = require("../../images/ned_logo.png");

const Login = (props) => {
  const setSignupForm = props.setSignupForm;

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const setSignupFormHandler = () => {
    setSignupForm(true);
  };
  const ForgotPasswordHandler = () => {
    props.setForgotPassword(true);
  };
  return (
    <div className={classes.innerDiv}>
      <div className={classes.logoDiv}>
        <img src={logo} alt="NED Logo" width="160px" />
      </div>
      <h2>Sign in to NED Scholarship Portal</h2>
      <h3>Enter your details below</h3>
      <form>
        <div className={classes.inputsDiv}>
          {/* Email Input */}
          <FormControl
            fullWidth
            error
            variant="outlined"
            className={classes.formInput}
          >
            <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
            <OutlinedInput
              id="outlined-adornment-email"
              type="email"
              label="Email"
            />
            <FormHelperText id="component-error-text">
              Incorrect Email!
            </FormHelperText>
          </FormControl>
          {/* pasword Input */}
          <FormControl
            fullWidth
            error
            variant="outlined"
            className={classes.formInput}
          >
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
            <FormHelperText id="component-error-text">
              Incorrect Password!
            </FormHelperText>
          </FormControl>
        </div>
        <div className={classes.submitDiv}>
          <button
            onClick={ForgotPasswordHandler}
            className={classes.forgotPassBtn}
          >
            Forgot your password?
          </button>
          <Button
            variant="contained"
            type="submit"
            className={classes.submitBtn}
          >
            Sign In
          </Button>
        </div>
      </form>
      <h3 className={classes.signupLink}>
        Don't have an account?{" "}
        <button onClick={setSignupFormHandler}>Signup</button>
      </h3>
    </div>
  );
};
export default Login;
