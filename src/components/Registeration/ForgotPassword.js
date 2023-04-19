import classes from "./ForgotPassword.module.css";
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText,
  Button,
} from "@mui/material";
import useInput from "../../Hooks/UseInput";
import { useNavigate } from "react-router-dom";
import { BACKEND_DOMAIN } from "../../config";
import { useOutletContext } from "react-router-dom";

const ForgotPassword = (props) => {
  const [handleLoader] = useOutletContext();

  const navigate = useNavigate();
  const ForgotPasswordHandler = () => {
    // props.setForgotPassword(false);
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
  } = useInput("", (value) => {
    const regex = /^[a-zA-Z0-9._%+-]+@cloud\.neduet\.edu\.pk$/;
    return regex.test(value.trim());
  });

  let formIsValid = false;
  if (enteredEmailisValid) {
    formIsValid = true;
  }
  const formSubmitHandler = async (event) => {
    try {
      event.preventDefault();
      if (!formIsValid) {
        return;
      }
      //add your logic
      const email = emailInputValue;
      handleLoader(true);
      const res = await fetch(`${BACKEND_DOMAIN}/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      if (res.status !== 200) {
        //here show an error through notification
        const resData = await res.json();
        console.log(resData.message);
        handleLoader(false);
        return;
      }
      const resData = await res.json();
      //add a notifaction
      console.log(resData.message);
      resetEmailInput();
      // redirect to login
      handleLoader(false);
      navigate("/auth/login");
    } catch (err) {
      throw new Error("Password reset failed!");
    }
  };
  return (
    <div className={classes.innerDiv}>
      <h2>Did you forget your password?</h2>
      <p>
        Enter your Email Address you're using for your account below and we will
        send you a verification code to reset your password
      </p>
      <form onSubmit={formSubmitHandler}>
        <FormControl
          fullWidth
          error={emailIsError && true}
          variant="outlined"
          className={classes.formInput}
        >
          <InputLabel htmlFor="outlined-adornment-email">
            NED Cloud Email*
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-email"
            type="email"
            label="NED Cloud Email*"
            value={emailInputValue}
            onChange={emailKeyStrockHandler}
            onBlur={emailInputBlurHandler}
          />
          {emailIsError && (
            <FormHelperText id="component-error-text">
              e.g.:"abc@cloud.neduet.edu.pk"
            </FormHelperText>
          )}
        </FormControl>
        <div className={classes.btnDIv}>
          <Button
            variant="contained"
            type="submit"
            className={classes.submitBtn}
          >
            Get verification Link
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
