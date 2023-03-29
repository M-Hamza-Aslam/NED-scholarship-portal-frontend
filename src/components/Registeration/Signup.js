import classes from "./Signup.module.css";
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
import useInput from "../../Hooks/UseInput";
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  const handleMouseDownConfirmPassword = (event) => {
    event.preventDefault();
  };
  const setSignupFormHandler = () => {
    // props.setSignupForm(false);
    navigate("/auth/login");
  };
  //form validations
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
  const {
    value: confirmPasswordInputValue,
    isValid: enteredConfirmPasswordisValid,
    isError: confirmPasswordIsError,
    inputKeyStrockHandler: confirmPasswordKeyStrockHandler,
    inputBlurHandler: confirmPasswordInputBlurHandler,
    reset: resetConfirmPasswordInput,
  } = useInput((value) => value === passwordInputValue);
  const {
    value: firstNameInputValue,
    isValid: enteredFirstNameisValid,
    isError: firstNameIsError,
    inputKeyStrockHandler: firstNameKeyStrockHandler,
    inputBlurHandler: firstNameInputBlurHandler,
    reset: resetFirstNameInput,
  } = useInput((value) => !(value.trim().length < 1));
  const {
    value: lastNameInputValue,
    isValid: enteredLastNameisValid,
    isError: lastNameIsError,
    inputKeyStrockHandler: lastNameKeyStrockHandler,
    inputBlurHandler: lastNameInputBlurHandler,
    reset: resetLastNameInput,
  } = useInput((value) => !(value.trim().length < 1));
  const {
    value: phoneNumberInputValue,
    isValid: enteredPhoneNumberisValid,
    isError: phoneNumberIsError,
    inputKeyStrockHandler: phoneNumberKeyStrockHandler,
    inputBlurHandler: phoneNumberInputBlurHandler,
    reset: resetPhoneNumberInput,
  } = useInput(
    (value) => value.trim().length === 12 && value.slice(0, 2) === "92"
  );

  let formIsValid = false;
  if (
    enteredEmailisValid &&
    enteredPasswordisValid &&
    enteredFirstNameisValid &&
    enteredLastNameisValid &&
    enteredConfirmPasswordisValid &&
    enteredPhoneNumberisValid
  ) {
    formIsValid = true;
  }
  const formSubmitHandler = async (event) => {
    try {
      event.preventDefault();
      if (!formIsValid) {
        return;
      }
      //add your logic
      const userAuthData = {
        firstName: firstNameInputValue,
        lastName: lastNameInputValue,
        phoneNumber: phoneNumberInputValue,
        email: emailInputValue,
        password: passwordInputValue,
      };
      console.log(userAuthData);
      const res = await fetch("http://localhost:8080/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userAuthData),
      });
      const resData = await res.json();
      console.log(resData);
      resetEmailInput();
      resetPasswordInput();
      resetConfirmPasswordInput();
      resetFirstNameInput();
      resetLastNameInput();
      resetPhoneNumberInput();
      // redirect to login page
      navigate("/auth/login");
    } catch (err) {
      throw new Error("User Signup failed!");
    }
  };
  return (
    <div className={classes.innerDiv}>
      <h2>Create your Account</h2>
      <p>to continue to NED Scholarship Portal</p>
      <h3>Note: Read Important Instructions for Signup</h3>
      <div className={classes.instructionDiv}>
        <p>
          1. Please enter your 12 digit cell phone number in the format
          92XXXXXXXXXX. <br></br> 2. Select a strong password of length atleast
          6 or more.
        </p>
      </div>
      <form onSubmit={formSubmitHandler}>
        <div className={classes.signupForm}>
          <FormControl
            error={firstNameIsError && true}
            variant="outlined"
            className={classes.formInput}
          >
            <InputLabel htmlFor="outlined-adornment-firstname">
              First Name*
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-firstname"
              type="text"
              label="Last Name"
              value={firstNameInputValue}
              onChange={firstNameKeyStrockHandler}
              onBlur={firstNameInputBlurHandler}
            />
            {firstNameIsError && (
              <FormHelperText id="component-error-text">
                Incorrect First Name!
              </FormHelperText>
            )}
          </FormControl>
          <FormControl
            error={lastNameIsError && true}
            variant="outlined"
            className={classes.formInput}
          >
            <InputLabel htmlFor="outlined-adornment-lastname">
              Last Name*
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-lastname"
              type="text"
              label="Last Name"
              value={lastNameInputValue}
              onChange={lastNameKeyStrockHandler}
              onBlur={lastNameInputBlurHandler}
            />
            {lastNameIsError && (
              <FormHelperText id="component-error-text">
                Incorrect Last Name!
              </FormHelperText>
            )}
          </FormControl>
          <FormControl
            error={emailIsError && true}
            variant="outlined"
            className={classes.formInput}
          >
            <InputLabel htmlFor="outlined-adornment-primaryemail">
              Primary Email*
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-primaryemail"
              type="email"
              label="Primary Email"
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
          <FormControl
            error={phoneNumberIsError && true}
            variant="outlined"
            className={classes.formInput}
          >
            <InputLabel htmlFor="outlined-adornment-number">
              Phone Number*
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-number"
              type="number"
              label="Phone Number"
              value={phoneNumberInputValue}
              onChange={phoneNumberKeyStrockHandler}
              onBlur={phoneNumberInputBlurHandler}
            />
            {phoneNumberIsError && (
              <FormHelperText id="component-error-text">
                Incorrect Number!
              </FormHelperText>
            )}
          </FormControl>
          <FormControl
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
          <FormControl
            error={confirmPasswordIsError && true}
            variant="outlined"
            className={classes.formInput}
          >
            <InputLabel htmlFor="outlined-adornment-confirmpassword">
              Confirm Password*
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-confirmpassword"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPasswordInputValue}
              onChange={confirmPasswordKeyStrockHandler}
              onBlur={confirmPasswordInputBlurHandler}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle confirmpassword visibility"
                    onClick={handleClickShowConfirmPassword}
                    onMouseDown={handleMouseDownConfirmPassword}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Confirm Password"
            />
            {confirmPasswordIsError && (
              <FormHelperText id="component-error-text">
                Password should be same!
              </FormHelperText>
            )}
          </FormControl>
          <Button
            variant="contained"
            type="submit"
            className={classes.submitBtn}
          >
            SignUp
          </Button>
          <Button
            variant="contained"
            type="button"
            className={classes.backBtn}
            onClick={setSignupFormHandler}
          >
            Back
          </Button>
        </div>
      </form>
    </div>
  );
};
export default Signup;
