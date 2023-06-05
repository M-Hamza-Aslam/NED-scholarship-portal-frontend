import classes from "./EmailVerification.module.css";
import { TextField, Button } from "@mui/material";
import useInput from "../../Hooks/UseInput";
import { toast } from "react-toastify";
import { BACKEND_DOMAIN } from "../../config";
import useLoader from "../../Hooks/UseLoader";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../../store/userSlice";
import { useNavigate } from "react-router-dom";

const EmailVerification = () => {
  const { LoadingComponent, loader, handleLoader } = useLoader();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.user.token);

  const {
    value: codeInputValue,
    isValid: enteredCodeisValid,
    isError: codeIsError,
    inputKeyStrockHandler: codeKeyStrockHandler,
    inputBlurHandler: codeInputBlurHandler,
    reset: resetCodeInput,
  } = useInput("", (value) => {
    const regex = /^\d{4}$/;
    return regex.test(value.trim());
  });

  const resendCodeHandler = async () => {
    handleLoader(true);
    const res = await fetch(`${BACKEND_DOMAIN}/emailVerification`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    if (res.status !== 201) {
      const resData = await res.json();
      toast.error(resData.message);
      handleLoader(false);
      return;
    }
    const resData = await res.json();
    toast.success(resData.message);
    handleLoader(false);
  };

  const formSubmitHandler = async (event) => {
    try {
      event.preventDefault();
      if (!enteredCodeisValid) {
        toast.error("Fill all inputs with valid values!");
        return;
      }
      handleLoader(true);
      const res = await fetch(`${BACKEND_DOMAIN}/verifyCode`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({ code: codeInputValue }),
      });
      if (res.status !== 201) {
        //here show an error through notification
        const resData = await res.json();
        toast.error(resData.message);
        handleLoader(false);
        return;
      }
      //update status in redux
      dispatch(userActions.updateUserData({ isVerified: true }));
      toast.success("your account has been verified");
      resetCodeInput();
      handleLoader(false);
      navigate("/");
    } catch (error) {
      console.log(error);
      handleLoader(false);
      toast.error("Email verification failed");
      throw new Error("Email verification failed");
    }
  };
  return (
    <div className={classes.innerDiv}>
      {loader && LoadingComponent}
      <h2>Email Verification</h2>
      <p>Enter Verification Code sent to your Email address</p>
      <form onSubmit={formSubmitHandler}>
        <TextField
          className={classes.formInput}
          label="Enter verification code"
          variant="outlined"
          type="number"
          value={codeInputValue}
          onChange={codeKeyStrockHandler}
          onBlur={codeInputBlurHandler}
          error={codeIsError && true}
          helperText={codeIsError ? "Invalid Code" : "Code must be of 4 digit!"}
          pattern="[0-9]*"
          inputProps={{
            maxLength: 4,
          }}
          fullWidth
        />
        <div className={classes.submitDiv}>
          <p>
            Not recieved the code?
            <button
              type="button"
              onClick={resendCodeHandler}
              className={classes.resendBtn}
            >
              Resend Code
            </button>
          </p>
          <Button
            variant="contained"
            type="submit"
            className={classes.submitBtn}
          >
            Verify Email
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EmailVerification;
