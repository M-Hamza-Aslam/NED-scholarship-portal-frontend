import classes from "./EditPersonalInfo.module.css";
import {
  FormControl,
  InputLabel,
  FormHelperText,
  Select,
  MenuItem,
  TextField,
  Button,
} from "@mui/material";
import useInput from "../../../Hooks/UseInput.js";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../../../store/userSlice";
// import { useNavigate } from "react-router-dom";

const EditPersonalInfo = (props) => {
  const personalInfo = useSelector((state) => {
    return {
      firstName: state.user.user.firstName,
      lastName: state.user.user.lastName,
      phoneNumber: state.user.user.phoneNumber,
      ...state.user.user.personalInfo,
    };
  });
  const token = useSelector((state) => state.user.user.token);
  const dispatch = useDispatch();
  const setEditMode = (value) => {
    props.setEditMode(value);
  };
  const {
    value: firstNameInputValue,
    isValid: enteredFirstNameisValid,
    isError: firstNameIsError,
    inputKeyStrockHandler: firstNameKeyStrockHandler,
    inputBlurHandler: firstNameInputBlurHandler,
    reset: resetFirstNameInput,
  } = useInput(
    personalInfo.firstName || "",
    (value) => !(value.trim().length < 1)
  );
  const {
    value: lastNameInputValue,
    isValid: enteredLastNameisValid,
    isError: lastNameIsError,
    inputKeyStrockHandler: lastNameKeyStrockHandler,
    inputBlurHandler: lastNameInputBlurHandler,
    reset: resetLastNameInput,
  } = useInput(
    personalInfo.lastName || "",
    (value) => !(value.trim().length < 1)
  );
  const {
    value: cnicInputValue,
    isValid: enteredCnicisValid,
    isError: cnicIsError,
    inputKeyStrockHandler: cnicKeyStrockHandler,
    inputBlurHandler: cnicInputBlurHandler,
    reset: resetCnicInput,
  } = useInput(personalInfo.cnic || "", (value) => {
    return value.trim().length === 13;
  });
  const {
    value: classInputValue,
    isValid: enteredClassisValid,
    isError: classIsError,
    inputKeyStrockHandler: classKeyStrockHandler,
    inputBlurHandler: classInputBlurHandler,
    reset: resetClassInput,
  } = useInput(personalInfo.class || "", (value) => !(value.trim().length < 1));
  const {
    value: rollNoInputValue,
    isValid: enteredRollNoisValid,
    isError: rollNoIsError,
    inputKeyStrockHandler: rollNoKeyStrockHandler,
    inputBlurHandler: rollNoInputBlurHandler,
    reset: resetRollNoInput,
  } = useInput(personalInfo.rollNo || "", (value) => {
    const rollNoRegex = /^[A-Za-z]{2}-\d{5}$/;
    return rollNoRegex.test(value.trim());
  });
  const {
    value: disciplineInputValue,
    isValid: enteredDisciplineisValid,
    isError: disciplineIsError,
    inputKeyStrockHandler: disciplineKeyStrockHandler,
    inputBlurHandler: disciplineInputBlurHandler,
    reset: resetDisciplineInput,
  } = useInput(
    personalInfo.discipline || "",
    (value) => !(value.trim().length < 1)
  );
  const {
    value: batchInputValue,
    isValid: enteredBatchisValid,
    isError: batchIsError,
    inputKeyStrockHandler: batchKeyStrockHandler,
    inputBlurHandler: batchInputBlurHandler,
    reset: resetBatchInput,
  } = useInput(personalInfo.batch || "", (value) => {
    const batchRegex = /^\d{4}$/;
    return batchRegex.test(value.trim());
  });
  const {
    value: categoryOfAdmissionInputValue,
    isValid: enteredCategoryOfAdmissionisValid,
    isError: categoryOfAdmissionIsError,
    inputKeyStrockHandler: categoryOfAdmissionKeyStrockHandler,
    inputBlurHandler: categoryOfAdmissionInputBlurHandler,
    reset: resetCategoryOfAdmissionInput,
  } = useInput(
    personalInfo.categoryOfAdmission || "",
    (value) => !(value.trim().length < 1)
  );
  const {
    value: phoneNumberInputValue,
    isValid: enteredPhoneNumberisValid,
    isError: phoneNumberIsError,
    inputKeyStrockHandler: phoneNumberKeyStrockHandler,
    inputBlurHandler: phoneNumberInputBlurHandler,
    reset: resetPhoneNumberInput,
  } = useInput(personalInfo.phoneNumber || "", (value) => {
    const phoneNoRegex = /^92\d{10}$/;
    return phoneNoRegex.test(value.trim());
  });
  const {
    value: alternativePhoneNumberInputValue,
    isValid: enteredAlternativePhoneNumberisValid,
    isError: alternativePhoneNumberIsError,
    inputKeyStrockHandler: alternativePhoneNumberKeyStrockHandler,
    inputBlurHandler: alternativePhoneNumberInputBlurHandler,
    reset: resetAlternativePhoneNumberInput,
  } = useInput(personalInfo.alternativePhoneNumber || "", (value) => {
    const phoneNoRegex = /^92\d{10}$/;
    return phoneNoRegex.test(value.trim());
  });
  const {
    value: emailInputValue,
    isValid: enteredEmailisValid,
    isError: emailIsError,
    inputKeyStrockHandler: emailKeyStrockHandler,
    inputBlurHandler: emailInputBlurHandler,
    reset: resetEmailInput,
  } = useInput(personalInfo.email || "", (value) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z]+.com$/;
    return emailRegex.test(value.trim());
  });
  const {
    value: residentialAddressInputValue,
    isValid: enteredResidentialAddressisValid,
    isError: residentialAddressIsError,
    inputKeyStrockHandler: residentialAddressKeyStrockHandler,
    inputBlurHandler: residentialAddressInputBlurHandler,
    reset: resetResidentialAddressInput,
  } = useInput(
    personalInfo.residentialAddress || "",
    (value) => !(value.trim().length < 1)
  );
  const {
    value: residentialDistrictInputValue,
    isValid: enteredResidentialDistrictisValid,
    isError: residentialDistrictIsError,
    inputKeyStrockHandler: residentialDistrictKeyStrockHandler,
    inputBlurHandler: residentialDistrictInputBlurHandler,
    reset: resetResidentialDistrictInput,
  } = useInput(
    personalInfo.residentialDistrict || "",
    (value) => !(value.trim().length < 1)
  );
  const {
    value: residentialCityInputValue,
    isValid: enteredResidentialCityisValid,
    isError: residentialCityIsError,
    inputKeyStrockHandler: residentialCityKeyStrockHandler,
    inputBlurHandler: residentialCityInputBlurHandler,
    reset: resetResidentialCityInput,
  } = useInput(
    personalInfo.residentialCity || "",
    (value) => !(value.trim().length < 1)
  );
  const {
    value: residentialProvinceInputValue,
    isValid: enteredResidentialProvinceisValid,
    isError: residentialProvinceIsError,
    inputKeyStrockHandler: residentialProvinceKeyStrockHandler,
    inputBlurHandler: residentialProvinceInputBlurHandler,
    reset: resetResidentialProvinceInput,
  } = useInput(
    personalInfo.residentialProvince || "",
    (value) => !(value.trim().length < 1)
  );
  const {
    value: permanentAddressInputValue,
    isValid: enteredPermanentAddressisValid,
    isError: permanentAddressIsError,
    inputKeyStrockHandler: permanentAddressKeyStrockHandler,
    inputBlurHandler: permanentAddressInputBlurHandler,
    reset: resetPermanentAddressInput,
  } = useInput(
    personalInfo.permanentAddress || "",
    (value) => !(value.trim().length < 1)
  );
  const {
    value: permanentDistrictInputValue,
    isValid: enteredPermanentDistrictisValid,
    isError: permanentDistrictIsError,
    inputKeyStrockHandler: permanentDistrictKeyStrockHandler,
    inputBlurHandler: permanentDistrictInputBlurHandler,
    reset: resetPermanentDistrictInput,
  } = useInput(
    personalInfo.permanentDistrict || "",
    (value) => !(value.trim().length < 1)
  );
  const {
    value: permanentCityInputValue,
    isValid: enteredPermanentCityisValid,
    isError: permanentCityIsError,
    inputKeyStrockHandler: permanentCityKeyStrockHandler,
    inputBlurHandler: permanentCityInputBlurHandler,
    reset: resetPermanentCityInput,
  } = useInput(
    personalInfo.permanentCity || "",
    (value) => !(value.trim().length < 1)
  );
  const {
    value: permanentProvinceInputValue,
    isValid: enteredPermanentProvinceisValid,
    isError: permanentProvinceIsError,
    inputKeyStrockHandler: permanentProvinceKeyStrockHandler,
    inputBlurHandler: permanentProvinceInputBlurHandler,
    reset: resetPermanentProvinceInput,
  } = useInput(
    personalInfo.permanentProvince || "",
    (value) => !(value.trim().length < 1)
  );

  let formIsValid = false;
  if (
    enteredFirstNameisValid &&
    enteredLastNameisValid &&
    enteredCnicisValid &&
    enteredClassisValid &&
    enteredRollNoisValid &&
    enteredDisciplineisValid &&
    enteredBatchisValid &&
    enteredCategoryOfAdmissionisValid &&
    enteredPhoneNumberisValid &&
    enteredAlternativePhoneNumberisValid &&
    enteredEmailisValid &&
    enteredResidentialAddressisValid &&
    enteredResidentialDistrictisValid &&
    enteredResidentialCityisValid &&
    enteredResidentialProvinceisValid &&
    enteredPermanentAddressisValid &&
    enteredPermanentDistrictisValid &&
    enteredPermanentCityisValid &&
    enteredPermanentProvinceisValid
  ) {
    formIsValid = true;
  }
  const formSubmitHandler = async (event) => {
    try {
      event.preventDefault();
      if (!formIsValid) {
        return;
      }
      //preparing inputData to send
      const userData = {
        firstName: firstNameInputValue,
        lastName: lastNameInputValue,
        phoneNumber: phoneNumberInputValue,
        personalInfo: {
          email: emailInputValue,
          cnic: cnicInputValue,
          class: classInputValue,
          rollNo: rollNoInputValue,
          discipline: disciplineInputValue,
          batch: batchInputValue,
          categoryOfAdmission: categoryOfAdmissionInputValue,
          alternativePhoneNumber: alternativePhoneNumberInputValue,
          residentialAddress: residentialAddressInputValue,
          residentialDistrict: residentialDistrictInputValue,
          residentialCity: residentialCityInputValue,
          residentialProvince: residentialProvinceInputValue,
          permanentAddress: permanentAddressInputValue,
          permanentDistrict: permanentDistrictInputValue,
          permanentCity: permanentCityInputValue,
          permanentProvince: permanentProvinceInputValue,
        },
      };
      //sending data
      const res = await fetch(
        "https://ned-scholarship-portal.onrender.com/personal-info",
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
      console.log("getting response:", resData);
      //here show success msg through notification
      dispatch(
        userActions.updateUserData({
          ...resData.updatedUserData,
        })
      );
      resetFirstNameInput();
      resetLastNameInput();
      resetCnicInput();
      resetClassInput();
      resetRollNoInput();
      resetDisciplineInput();
      resetBatchInput();
      resetCategoryOfAdmissionInput();
      resetPhoneNumberInput();
      resetAlternativePhoneNumberInput();
      resetEmailInput();
      resetResidentialAddressInput();
      resetResidentialDistrictInput();
      resetResidentialCityInput();
      resetResidentialProvinceInput();
      resetPermanentAddressInput();
      resetPermanentDistrictInput();
      resetPermanentCityInput();
      resetPermanentProvinceInput();

      setEditMode(false);

      //
    } catch (err) {
      console.log(err);
      throw new Error("User Signup failed!");
    }
  };
  return (
    <div className={classes.section}>
      <form onSubmit={formSubmitHandler}>
        <div className={classes.headingDiv}>
          <h2>Tell Us About Yourself</h2>
        </div>
        <hr></hr>
        <div className={classes.inputContainer}>
          <TextField
            id="outlined-adornment-firstname"
            label="First Name*"
            error={firstNameIsError && true}
            size="small"
            className={classes.formInput}
            value={firstNameInputValue}
            onChange={firstNameKeyStrockHandler}
            onBlur={firstNameInputBlurHandler}
            helperText={
              firstNameIsError ? "Incorrect First Name!" : "Enter First Name"
            }
          />
          <TextField
            id="outlined-adornment-lastname"
            label="Last Name*"
            error={lastNameIsError && true}
            size="small"
            className={classes.formInput}
            value={lastNameInputValue}
            onChange={lastNameKeyStrockHandler}
            onBlur={lastNameInputBlurHandler}
            helperText={
              lastNameIsError ? "Incorrect Last Name!" : "Enter Last Name"
            }
          />
          <TextField
            id="outlined-adornment-cnic"
            label="CNIC Number*"
            error={cnicIsError && true}
            size="small"
            className={classes.formInput}
            value={cnicInputValue}
            onChange={cnicKeyStrockHandler}
            onBlur={cnicInputBlurHandler}
            helperText={'e.g.:"4290148537817"'}
            type="number"
          />
          <TextField
            id="outlined-adornment-class"
            label="Class*"
            error={classIsError && true}
            size="small"
            className={classes.formInput}
            value={classInputValue}
            onChange={classKeyStrockHandler}
            onBlur={classInputBlurHandler}
            helperText={classIsError ? "Incorrect Class!" : "Enter Class"}
          />
          <TextField
            id="outlined-adornment-rollNo"
            label="Roll No*"
            error={rollNoIsError && true}
            size="small"
            className={classes.formInput}
            value={rollNoInputValue}
            onChange={rollNoKeyStrockHandler}
            onBlur={rollNoInputBlurHandler}
            helperText={'e.g.:"CT-20071"'}
          />
          <TextField
            id="outlined-adornment-discipline"
            label="Discipline*"
            error={disciplineIsError && true}
            size="small"
            className={classes.formInput}
            value={disciplineInputValue}
            onChange={disciplineKeyStrockHandler}
            onBlur={disciplineInputBlurHandler}
            helperText={"Enter Discipline"}
          />
          <TextField
            id="outlined-adornment-batch"
            label="Batch*"
            error={batchIsError && true}
            size="small"
            className={classes.formInput}
            value={batchInputValue}
            onChange={batchKeyStrockHandler}
            onBlur={batchInputBlurHandler}
            helperText={'e.g.:"2020"'}
          />
          <FormControl
            error={categoryOfAdmissionIsError && true}
            variant="outlined"
            size="small"
            className={classes.formInput}
          >
            <InputLabel id="categoryOfAdmission-select-label">
              Category of Admission*
            </InputLabel>
            <Select
              labelId="categoryOfAdmission-select-label"
              id="categoryOfAdmission-select"
              label="Category of Admission"
              value={categoryOfAdmissionInputValue}
              onChange={categoryOfAdmissionKeyStrockHandler}
              onBlur={categoryOfAdmissionInputBlurHandler}
            >
              <MenuItem value={"self"}>Self</MenuItem>
              <MenuItem value={"merit"}>Merit</MenuItem>
            </Select>
            <FormHelperText id="component-error-text">
              Select Category of Admission!
            </FormHelperText>
          </FormControl>
        </div>
        <div className={classes.headingDiv}>
          <h2>Contact Details</h2>
        </div>
        <hr></hr>
        <div className={classes.inputContainer}>
          <TextField
            id="outlined-adornment-phoneNumber"
            label="Phone Number*"
            error={phoneNumberIsError && true}
            size="small"
            className={classes.formInput}
            value={phoneNumberInputValue}
            onChange={phoneNumberKeyStrockHandler}
            onBlur={phoneNumberInputBlurHandler}
            helperText={'e.g.:"923230160444"'}
          />
          <TextField
            id="outlined-adornment-alternativePhoneNumber"
            label="Alternative Phone Number*"
            error={alternativePhoneNumberIsError && true}
            size="small"
            className={classes.formInput}
            value={alternativePhoneNumberInputValue}
            onChange={alternativePhoneNumberKeyStrockHandler}
            onBlur={alternativePhoneNumberInputBlurHandler}
            helperText={'e.g.:"923230160444"'}
          />
          <TextField
            id="outlined-adornment-email"
            label="Email*"
            error={emailIsError && true}
            size="small"
            className={classes.formInput}
            value={emailInputValue}
            onChange={emailKeyStrockHandler}
            onBlur={emailInputBlurHandler}
            helperText={'e.g.:"abcd@gmail.com"'}
          />
        </div>
        <div className={classes.headingDiv}>
          <h2>Residential Address</h2>
        </div>
        <hr></hr>
        <div className={classes.inputContainer}>
          <TextField
            id="outlined-multiline-flexible-residentialAddress"
            label="Address*"
            multiline
            maxRows={4}
            error={residentialAddressIsError && true}
            size="small"
            className={`${classes.formInput} ${classes.fullWidth}`}
            value={residentialAddressInputValue}
            onChange={residentialAddressKeyStrockHandler}
            onBlur={residentialAddressInputBlurHandler}
            helperText={"Enter Address"}
          />
          <TextField
            id="outlined-multiline-flexible-residentialDistrict"
            label="District*"
            error={residentialDistrictIsError && true}
            size="small"
            className={classes.formInput}
            value={residentialDistrictInputValue}
            onChange={residentialDistrictKeyStrockHandler}
            onBlur={residentialDistrictInputBlurHandler}
            helperText={'e.g: "Karachi-South"'}
          />
          <TextField
            id="outlined-multiline-flexible-residentialCity"
            label="City*"
            error={residentialCityIsError && true}
            size="small"
            className={classes.formInput}
            value={residentialCityInputValue}
            onChange={residentialCityKeyStrockHandler}
            onBlur={residentialCityInputBlurHandler}
            helperText={'e.g: "Karachi"'}
          />
          <TextField
            id="outlined-multiline-flexible-residentialProvince"
            label="Province*"
            error={residentialProvinceIsError && true}
            size="small"
            className={classes.formInput}
            value={residentialProvinceInputValue}
            onChange={residentialProvinceKeyStrockHandler}
            onBlur={residentialProvinceInputBlurHandler}
            helperText={'e.g: "Sindh"'}
          />
        </div>
        <div className={classes.headingDiv}>
          <h2>Permanent Address</h2>
        </div>
        <hr></hr>
        <div className={classes.inputContainer}>
          <TextField
            id="outlined-multiline-flexible-permanentAddress"
            label="Address*"
            multiline
            maxRows={4}
            error={permanentAddressIsError && true}
            size="small"
            className={`${classes.formInput} ${classes.fullWidth}`}
            value={permanentAddressInputValue}
            onChange={permanentAddressKeyStrockHandler}
            onBlur={permanentAddressInputBlurHandler}
            helperText={"Enter Address"}
          />
          <TextField
            id="outlined-multiline-flexible-permanentDistrict"
            label="District*"
            error={permanentDistrictIsError && true}
            size="small"
            className={classes.formInput}
            value={permanentDistrictInputValue}
            onChange={permanentDistrictKeyStrockHandler}
            onBlur={permanentDistrictInputBlurHandler}
            helperText={'e.g: "Karachi-South"'}
          />
          <TextField
            id="outlined-multiline-flexible-permanentCity"
            label="City*"
            error={permanentCityIsError && true}
            size="small"
            className={classes.formInput}
            value={permanentCityInputValue}
            onChange={permanentCityKeyStrockHandler}
            onBlur={permanentCityInputBlurHandler}
            helperText={'e.g: "Karachi"'}
          />
          <TextField
            id="outlined-multiline-flexible-permanentProvince"
            label="Province*"
            error={permanentProvinceIsError && true}
            size="small"
            className={classes.formInput}
            value={permanentProvinceInputValue}
            onChange={permanentProvinceKeyStrockHandler}
            onBlur={permanentProvinceInputBlurHandler}
            helperText={'e.g: "Sindh"'}
          />
        </div>
        <div className={classes.btnDiv}>
          <Button type="submit" variant="contained">
            Save Personal Info
          </Button>
          <Button
            type="button"
            variant="outlined"
            onClick={() => setEditMode(false)}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};
export default EditPersonalInfo;
