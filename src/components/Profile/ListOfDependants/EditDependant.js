import classes from "./EditDependant.module.css";
import useInput from "../../../Hooks/UseInput.js";
import { Button, TextField } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../../../store/userSlice";
import { BACKEND_DOMAIN } from "../../../config";
import useLoader from "../../../Hooks/UseLoader";
import { toast } from "react-toastify";

const EditDependant = (props) => {
  const { LoadingComponent, loader, handleLoader } = useLoader();

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
        toast.error("Fill all inputs with valid values!");
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
      handleLoader(true);
      //sending dependantData
      const res = await fetch(`${BACKEND_DOMAIN}/dependant-details`, {
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
        toast.error(resData.message);
        return;
      }
      const resData = await res.json();
      //here show success msg through notification
      dispatch(
        userActions.updateUserData({
          ...resData.updatedUserData,
        })
      );
      toast.success(resData.message);

      resetNameInput();
      resetAgeInput();
      resetRelationInput();
      resetOccupationInput();

      handleLoader(false);
      setIsEdit(false);
    } catch (err) {
      console.log(err);
      handleLoader(false);
      toast.error("Failed to add dependant info");
      throw new Error("Failed to add dependant info");
    }
  };
  return (
    <form onSubmit={formSubmitHandler}>
      {loader && LoadingComponent}
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
        <Button type="submit" variant="contained" className={classes.submitDiv}>
          Save Dependant
        </Button>
        <Button
          type="button"
          variant="outlined"
          onClick={() => setIsEdit(false)}
          className={classes.cencelDiv}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};
export default EditDependant;
