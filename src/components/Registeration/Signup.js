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
const Signup = (props) => {
  const setSignupForm = props.setSignupForm;
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
    setSignupForm(false);
  };
  return (
    <div className={classes.innerDiv}>
      <h2>Create your Account</h2>
      <p>to continue to NED Scholarship Portal</p>
      <h3>Note:Read Important Instruction for Signup</h3>
      <div className={classes.instructionDiv}>
        <p>
          1. Please enter your 13 digit NADRA CNIC number without dashes for an
          account creation. <br></br> 2. In case you do not have NADRA CNIC,
          please enter your 13 digit B-Form number without dashes for an account
          creation.
        </p>
      </div>
      <form>
        <div className={classes.signupForm}>
          <FormControl error variant="outlined" className={classes.formInput}>
            <InputLabel htmlFor="outlined-adornment-firstname">
              First Name
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-firstname"
              type="text"
              label="Last Name"
            />
            <FormHelperText id="component-error-text">
              Incorrect Last Name!
            </FormHelperText>
          </FormControl>
          <FormControl error variant="outlined" className={classes.formInput}>
            <InputLabel htmlFor="outlined-adornment-lastname">
              Last Name
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-lastname"
              type="text"
              label="Last Name"
            />
            <FormHelperText id="component-error-text">
              Incorrect Last Name!
            </FormHelperText>
          </FormControl>
          <FormControl error variant="outlined" className={classes.formInput}>
            <InputLabel htmlFor="outlined-adornment-primaryemail">
              Primary Email
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-primaryemail"
              type="email"
              label="Primary Email"
            />
            <FormHelperText id="component-error-text">
              Incorrect Email!
            </FormHelperText>
          </FormControl>
          <FormControl error variant="outlined" className={classes.formInput}>
            <InputLabel htmlFor="outlined-adornment-number">
              Phone Number
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-number"
              type="number"
              label="Phone Number"
            />
            <FormHelperText id="component-error-text">
              Incorrect Number!
            </FormHelperText>
          </FormControl>
          <FormControl error variant="outlined" className={classes.formInput}>
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
          <FormControl error variant="outlined" className={classes.formInput}>
            <InputLabel htmlFor="outlined-adornment-confirmpassword">
              Confirm Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-confirmpassword"
              type={showConfirmPassword ? "text" : "password"}
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
            <FormHelperText id="component-error-text">
              Password should be same!
            </FormHelperText>
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
