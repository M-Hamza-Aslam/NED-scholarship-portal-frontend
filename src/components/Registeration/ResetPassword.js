import { useNavigate, useParams } from "react-router-dom";
import classes from "./ResetPassword.module.css";
import useInput from "../../Hooks/UseInput";
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

const ResetPassword = (props) => {
  const params = useParams();
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
  const goBackHandler = () => [navigate("/auth/login")];
  //form validation
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
  let formIsValid = false;
  if (enteredPasswordisValid && enteredConfirmPasswordisValid) {
    formIsValid = true;
  }
  const formSubmitHandler = async (event) => {
    try {
      event.preventDefault();
      if (!formIsValid) {
        return;
      }
      //add your logic
      const token = params.token;
      const newPassword = passwordInputValue;
      const res = await fetch(
        "https://ned-scholarship-portal.onrender.com/reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token, newPassword }),
        }
      );
      if (res.status !== 201) {
        //here show an error through notification
        const resData = await res.json();
        console.log(resData);
        return;
      }
      const resData = await res.json();
      //add success message
      console.log(resData.message);
      //reset inputs
      resetPasswordInput();
      resetConfirmPasswordInput();

      navigate("/auth/login");
    } catch (error) {
      throw new Error("Password reset failed!");
    }
  };
  return (
    <div className={classes.innerDiv}>
      <h2>Reset your password</h2>
      <p>Enter your new password below. Password must be 6 digits long</p>
      <form onSubmit={formSubmitHandler}>
        <div className={classes.inputsDiv}>
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
          <FormControl
            error={confirmPasswordIsError && true}
            variant="outlined"
            className={classes.formInput}
            fullWidth
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
        </div>
        <div className={classes.btnDiv}>
          <Button
            variant="contained"
            type="submit"
            className={classes.submitBtn}
          >
            Reset Password
          </Button>
          <Button
            variant="contained"
            type="button"
            className={classes.backBtn}
            onClick={goBackHandler}
          >
            cancel
          </Button>
        </div>
      </form>
    </div>
  );
};
export default ResetPassword;