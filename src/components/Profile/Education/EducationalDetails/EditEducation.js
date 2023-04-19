import classes from "./EditEducation.module.css";
import useInput from "../../../../Hooks/UseInput.js";
import { Button, TextField } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../../../../store/userSlice";
import { BACKEND_DOMAIN } from "../../../../config";
import useLoader from "../../../../Hooks/UseLoader";

const EditEducation = (props) => {
  const { LoadingComponent, loader, handleLoader } = useLoader();

  const index = props.index;
  let educationalDetails = useSelector((state) => {
    return {
      ...state.user.user.education.educationalDetails,
    };
  });
  let educationalDetailsObj = {};
  if (index !== -1) {
    educationalDetailsObj = educationalDetails[index];
  }
  const token = useSelector((state) => state.user.user.token);
  const dispatch = useDispatch();

  const setIsEdit = (value) => {
    props.setIsEdit(value);
  };
  const {
    value: classInputValue,
    isValid: enteredClassisValid,
    isError: classIsError,
    inputKeyStrockHandler: classKeyStrockHandler,
    inputBlurHandler: classInputBlurHandler,
    reset: resetClassInput,
  } = useInput(educationalDetailsObj.class || "", (value) => {
    const Regex = /^[0-9]{4}$/;
    return Regex.test(value.trim());
  });
  const {
    value: seatNoInputValue,
    isValid: enteredSeatNoisValid,
    isError: seatNoIsError,
    inputKeyStrockHandler: seatNoKeyStrockHandler,
    inputBlurHandler: seatNoInputBlurHandler,
    reset: resetSeatNoInput,
  } = useInput(educationalDetailsObj.seatNo || "", (value) => {
    const Regex = /^[0-9]+$/;
    return Regex.test(value.trim());
  });
  const {
    value: totalMarksCGPAInputValue,
    isValid: enteredTotalMarksCGPAisValid,
    isError: totalMarksCGPAIsError,
    inputKeyStrockHandler: totalMarksCGPAKeyStrockHandler,
    inputBlurHandler: totalMarksCGPAInputBlurHandler,
    reset: resetTotalMarksCGPAInput,
  } = useInput(educationalDetailsObj.totalMarksCGPA || "", (value) => {
    const Regex = /^[0-9]+$/;
    return Regex.test(value.trim());
  });
  const {
    value: obtainedMarksCGPAInputValue,
    isValid: enteredObtainedMarksCGPAisValid,
    isError: obtainedMarksCGPAIsError,
    inputKeyStrockHandler: obtainedMarksCGPAKeyStrockHandler,
    inputBlurHandler: obtainedMarksCGPAInputBlurHandler,
    reset: resetObtainedMarksCGPAInput,
  } = useInput(educationalDetailsObj.obtainedMarksCGPA || "", (value) => {
    const Regex = /^[0-9]+$/;
    return Regex.test(value.trim());
  });
  const {
    value: percentageInputValue,
    isValid: enteredPercentageisValid,
    isError: percentageIsError,
    inputKeyStrockHandler: percentageKeyStrockHandler,
    inputBlurHandler: percentageInputBlurHandler,
    reset: resetPercentageInput,
  } = useInput(educationalDetailsObj.percentage || "", (value) => {
    const Regex = /^[0-9]+$/;
    return Regex.test(value.trim()) && value.trim() <= 100;
  });
  const {
    value: meritPositionInputValue,
    isValid: enteredMeritPositionisValid,
    isError: meritPositionIsError,
    inputKeyStrockHandler: meritPositionKeyStrockHandler,
    inputBlurHandler: meritPositionInputBlurHandler,
    reset: resetMeritPositionInput,
  } = useInput(educationalDetailsObj.meritPosition || "", (value) => {
    const Regex = /^[A-Za-z]+$/;
    return Regex.test(value.trim());
  });

  let formIsValid = false;
  if (
    enteredClassisValid &&
    enteredSeatNoisValid &&
    enteredTotalMarksCGPAisValid &&
    enteredObtainedMarksCGPAisValid &&
    enteredPercentageisValid &&
    enteredMeritPositionisValid
  ) {
    formIsValid = true;
  }
  const formSubmitHandler = async (event) => {
    try {
      event.preventDefault();
      if (!formIsValid) {
        return;
      }
      //preparing educationData to send
      const userData = {
        educationData: {
          class: classInputValue,
          seatNo: seatNoInputValue,
          totalMarksCGPA: totalMarksCGPAInputValue,
          obtainedMarksCGPA: obtainedMarksCGPAInputValue,
          percentage: percentageInputValue,
          meritPosition: meritPositionInputValue,
        },
        index,
      };
      handleLoader(true);
      //sending educationData
      const res = await fetch(`${BACKEND_DOMAIN}/education-details`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(userData),
      });
      if (res.status !== 201) {
        //here show an error through notification
        const resData = await res.json();
        console.log(resData.message);
        return;
      }
      const resData = await res.json();
      //here show success msg through notification
      dispatch(
        userActions.updateUserData({
          ...resData.updatedUserData,
        })
      );
      resetClassInput();
      resetSeatNoInput();
      resetTotalMarksCGPAInput();
      resetObtainedMarksCGPAInput();
      resetPercentageInput();
      resetMeritPositionInput();

      handleLoader(false);
      setIsEdit(false);
    } catch (err) {
      console.log(err);
      handleLoader(false);
      throw new Error("User Signup failed!");
    }
  };
  return (
    <form onSubmit={formSubmitHandler}>
      {loader && LoadingComponent}
      <div className={classes.inputContainer}>
        <TextField
          id="outlined-adornment-class"
          label="Class/Year*"
          error={classIsError && true}
          size="small"
          type="number"
          className={classes.formInput}
          value={classInputValue}
          onChange={classKeyStrockHandler}
          onBlur={classInputBlurHandler}
          helperText={`e.g.:"2020"`}
        />
        <TextField
          id="outlined-adornment-seatNo"
          label="Seat No.*"
          error={seatNoIsError && true}
          size="small"
          type="number"
          className={classes.formInput}
          value={seatNoInputValue}
          onChange={seatNoKeyStrockHandler}
          onBlur={seatNoInputBlurHandler}
          helperText={`e.g.:"356987"`}
        />
        <TextField
          id="outlined-adornment-totalMarksCGPA"
          label="Total Max Marks/CGPA*"
          error={totalMarksCGPAIsError && true}
          size="small"
          type="number"
          className={classes.formInput}
          value={totalMarksCGPAInputValue}
          onChange={totalMarksCGPAKeyStrockHandler}
          onBlur={totalMarksCGPAInputBlurHandler}
          helperText={`e.g.:"850"`}
        />
        <TextField
          id="outlined-adornment-obtainedMarksCGPA"
          label="obtained Marks/CGPA*"
          error={obtainedMarksCGPAIsError && true}
          size="small"
          type="number"
          className={classes.formInput}
          value={obtainedMarksCGPAInputValue}
          onChange={obtainedMarksCGPAKeyStrockHandler}
          onBlur={obtainedMarksCGPAInputBlurHandler}
          helperText={`e.g.:"665"`}
        />
        <TextField
          id="outlined-adornment-percentage"
          label="Percentage*"
          error={percentageIsError && true}
          size="small"
          type="number"
          className={classes.formInput}
          value={percentageInputValue}
          onChange={percentageKeyStrockHandler}
          onBlur={percentageInputBlurHandler}
          helperText={`e.g.:"85"`}
        />
        <TextField
          id="outlined-adornment-meritPosition"
          label="Merit Position(if any)*"
          error={meritPositionIsError && true}
          size="small"
          className={classes.formInput}
          value={meritPositionInputValue}
          onChange={meritPositionKeyStrockHandler}
          onBlur={meritPositionInputBlurHandler}
          helperText={`e.g.:"First"`}
        />
      </div>
      <div className={classes.btnDiv}>
        <Button type="submit" variant="contained">
          Save Education
        </Button>
        <Button
          type="button"
          variant="outlined"
          onClick={() => setIsEdit(false)}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};
export default EditEducation;
