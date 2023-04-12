import classes from "./EditDependant.module.css";
import useInput from "../../../Hooks/UseInput.js";
import { Button, TextField } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../../../store/userSlice";

const EditDependant = (props) => {
  const index = props.index;
  let dependantDetails = useSelector((state) => {
    return {
      ...state.user.user.dependantDetails,
    };
  });
  if (index === -1) {
    dependantDetails = {};
  } else {
    dependantDetails = dependantDetails.dependantDetailsArr[index];
  }
  const token = useSelector((state) => state.user.user.token);
  const dispatch = useDispatch();

  const setIsEdit = (value) => {
    props.setIsEdit(value);
  };
  const {
    value: nameInputValue,
    isValid: enteredNameisValid,
    isError: nameIsError,
    inputKeyStrockHandler: nameKeyStrockHandler,
    inputBlurHandler: nameInputBlurHandler,
    reset: resetNameInput,
  } = useInput(dependantDetails.name || "", (value) => {
    const nameRegex = /^[A-Za-z]+$/;
    return nameRegex.test(value.trim());
  });
  const {
    value: relationInputValue,
    isValid: enteredRelationisValid,
    isError: relationIsError,
    inputKeyStrockHandler: relationKeyStrockHandler,
    inputBlurHandler: relationInputBlurHandler,
    reset: resetRelationInput,
  } = useInput(dependantDetails.relation || "", (value) => {
    const relationRegex = /^[A-Za-z]+$/;
    return relationRegex.test(value.trim());
  });
  const {
    value: ageInputValue,
    isValid: enteredAgeisValid,
    isError: ageIsError,
    inputKeyStrockHandler: ageKeyStrockHandler,
    inputBlurHandler: ageInputBlurHandler,
    reset: resetAgeInput,
  } = useInput(dependantDetails.age || "", (value) => {
    const ageRegex = /^[0-9]{2}$/;
    return ageRegex.test(value.trim());
  });
  const {
    value: occupationInputValue,
    isValid: enteredOccupationisValid,
    isError: occupationIsError,
    inputKeyStrockHandler: occupationKeyStrockHandler,
    inputBlurHandler: occupationInputBlurHandler,
    reset: resetOccupationInput,
  } = useInput(dependantDetails.occupation || "", (value) => {
    const occupationRegex = /^[A-Za-z]+$/;
    return occupationRegex.test(value.trim());
  });
  let formIsValid = false;
  if (
    enteredNameisValid &&
    enteredAgeisValid &&
    enteredRelationisValid &&
    enteredOccupationisValid
  ) {
    formIsValid = true;
  }
  const formSubmitHandler = async (event) => {
    try {
      event.preventDefault();
      if (!formIsValid) {
        return;
      }
      //preparing dependantData to send
      const userData = {
        dependantData: {
          name: nameInputValue,
          relation: relationInputValue,
          age: ageInputValue,
          occupation: occupationInputValue,
        },
        index,
      };
      //sending dependantData
      const res = await fetch("http://localhost:8080/dependant-details", {
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
      resetNameInput();
      resetAgeInput();
      resetRelationInput();
      resetOccupationInput();

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
          id="outlined-adornment-name"
          label="Name*"
          error={nameIsError && true}
          size="small"
          className={classes.formInput}
          value={nameInputValue}
          onChange={nameKeyStrockHandler}
          onBlur={nameInputBlurHandler}
          helperText={"Enter Name"}
        />
        <TextField
          id="outlined-adornment-relation"
          label="Relation*"
          error={relationIsError && true}
          size="small"
          className={classes.formInput}
          value={relationInputValue}
          onChange={relationKeyStrockHandler}
          onBlur={relationInputBlurHandler}
          helperText={'e.g.:"Son" '}
        />
        <TextField
          id="outlined-adornment-age"
          label="Age*"
          error={ageIsError && true}
          size="small"
          type="number"
          className={classes.formInput}
          value={ageInputValue}
          onChange={ageKeyStrockHandler}
          onBlur={ageInputBlurHandler}
          helperText={'e.g.:"18"'}
        />
        <TextField
          id="outlined-adornment-occupation"
          label="Occupation*"
          error={occupationIsError && true}
          size="small"
          className={classes.formInput}
          value={occupationInputValue}
          onChange={occupationKeyStrockHandler}
          onBlur={occupationInputBlurHandler}
          helperText={'e.g.:"Student" '}
        />
      </div>
      <div className={classes.btnDiv}>
        <Button type="submit" variant="contained">
          Save Dependant
        </Button>
        <Button type="button" variant="outlined" onClick={setIsEdit}>
          Cancel
        </Button>
      </div>
    </form>
  );
};
export default EditDependant;
