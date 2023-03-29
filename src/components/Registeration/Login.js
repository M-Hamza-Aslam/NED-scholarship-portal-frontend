import React, { useState } from "react";
import classes from "./Login.module.css";
import {
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormControl,
  FormHelperText,
  Button,
  Radio,
  RadioGroup,
  FormLabel,
  FormControlLabel,
} from "@mui/material";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import useInput from "../../Hooks/UseInput";
import { useNavigate } from "react-router-dom";

const logo = require("../../images/ned_logo.png");

const Login = (props) => {
  const navigate = useNavigate();

  const [userRole, setUserRole] = useState("student");

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleUserRole = (event) => {
    setUserRole(event.target.value);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const setSignupFormHandler = () => {
    // props.setSignupForm(true);
    navigate("/auth/signup");
  };
  const ForgotPasswordHandler = () => {
    navigate("/auth/reset-password");
    // props.setForgotPassword(true);
  };
  //formvalidations
  const {
    value: emailInputValue,
    isValid: enteredEmailisValid,
    isError: emailIsError,
    inputKeyStrockHandler: emailKeyStrockHandler,
    inputBlurHandler: emailInputBlurHandler,
    reset: resetEmailInput,
  } = useInput((value) => value.includes("@"));
  const {
    value: passwordInputValue,
    isValid: enteredPasswordisValid,
    isError: passwordIsError,
    inputKeyStrockHandler: passwordKeyStrockHandler,
    inputBlurHandler: passwordInputBlurHandler,
    reset: resetPasswordInput,
  } = useInput((value) => !(value.trim().length < 6));

  let formIsValid = false;
  if (enteredEmailisValid && enteredPasswordisValid) {
    formIsValid = true;
  }
  const formSubmitHandler = async (event) => {
    try {
      event.preventDefault();
      if (!formIsValid) {
        return;
      }
      //add your logic
      console.log(userRole);
      console.log(emailInputValue);
      console.log(passwordInputValue);
      const userAuthData = {
        email: emailInputValue,
        password: passwordInputValue,
        userRole: userRole,
      };
      const res = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userAuthData),
      });
      const resData = await res.json();
      console.log(resData);
      //add token in redux store.

      resetEmailInput();
      resetPasswordInput();
    } catch (err) {
      throw new Error("User login Failed!");
    }
  };
  return (
    <div className={classes.innerDiv}>
      <div className={classes.logoDiv}>
        <img src={logo} alt="NED Logo" width="160px" />
      </div>
      <h2>Sign in to NED Scholarship Portal</h2>
      <h3>Enter your details below</h3>
      <form onSubmit={formSubmitHandler}>
        <div className={classes.inputsDiv}>
          <FormControl className={classes.formInput}>
            <FormLabel id="demo-row-radio-buttons-group-label">
              Select Role
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              value={userRole}
              onChange={handleUserRole}
            >
              <FormControlLabel
                value="student"
                control={<Radio />}
                label="Student"
              />
              <FormControlLabel
                value="admin"
                control={<Radio />}
                label="Admin"
              />
            </RadioGroup>
          </FormControl>
          {/* Email Input */}
          <FormControl
            fullWidth
            error={emailIsError && true}
            variant="outlined"
            className={classes.formInput}
          >
            <InputLabel htmlFor="outlined-adornment-email">Email*</InputLabel>
            <OutlinedInput
              id="outlined-adornment-email"
              type="email"
              label="Email"
              value={emailInputValue}
              onChange={emailKeyStrockHandler}
              onBlur={emailInputBlurHandler}
            />
            {emailIsError && (
              <FormHelperText id="component-error-text">
                Incorrect Email!
              </FormHelperText>
            )}
          </FormControl>
          {/* pasword Input */}
          <FormControl
            fullWidth
            error={passwordIsError && true}
            variant="outlined"
            className={classes.formInput}
          >
            <InputLabel htmlFor="outlined-adornment-password">
              Password*
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              value={passwordInputValue}
              onChange={passwordKeyStrockHandler}
              onBlur={passwordInputBlurHandler}
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
            {passwordIsError && (
              <FormHelperText id="component-error-text">
                Incorrect Password!
              </FormHelperText>
            )}
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
