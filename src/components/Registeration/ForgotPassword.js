import classes from "./ForgotPassword.module.css";
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText,
  Button,
} from "@mui/material";

const ForgotPassword = (props) => {
  const ForgotPasswordHandler = () => {
    props.setForgotPassword(false);
  };
  return (
    <div className={classes.innerDiv}>
      <h2>Did you forget your password?</h2>
      <p>
        Enter your Email Address you're using for your account below and we will
        send you a verification code to reset your password
      </p>
      <form>
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
        <div className={classes.btnDIv}>
          <Button
            variant="contained"
            type="submit"
            className={classes.submitBtn}
          >
            Get verification Code
          </Button>
          <Button
            variant="contained"
            type="button"
            className={classes.backBtn}
            onClick={ForgotPasswordHandler}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};
export default ForgotPassword;
