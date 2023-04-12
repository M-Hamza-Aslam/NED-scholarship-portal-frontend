import classes from "./EditEducation.module.css";
import useInput from "../../../Hooks/UseInput.js";
import { Button, TextField } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../../../store/userSlice";

const EditEducation = (props) => {
  const index = props.index;
  let educationalDetails = useSelector((state) => {
    return {
      ...state.user.user.educationalDetails,
    };
  });
  if (index === -1) {
    educationalDetails = {};
  } else {
    educationalDetails = educationalDetails.educationalDetailsArr[index];
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
  } = useInput(educationalDetails.class || "", (value) => {
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
  } = useInput(educationalDetails.seatNo || "", (value) => {
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
  } = useInput(educationalDetails.totalMarksCGPA || "", (value) => {
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
  } = useInput(educationalDetails.obtainedMarksCGPA || "", (value) => {
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
  } = useInput(educationalDetails.percentage || "", (value) => {
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
  } = useInput(educationalDetails.meritPosition || "", (value) => {
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
      //sending educationData
      const res = await fetch(
        "https://ned-scholarship-portal.onrender.com/education-details",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify(userData),
        }
      );
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

      setIsEdit(false);
    } catch (err) {
      console.log(err);
      throw new Error("User Signup failed!");
    }
  };
  return (
    <form onSubmit={formSubmitHandler}>
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
