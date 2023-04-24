import classes from "./EditFamilyDetails.module.css";
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
import { BACKEND_DOMAIN } from "../../../config";
import useLoader from "../../../Hooks/UseLoader";
import { toast } from "react-toastify";

const EditFamilyDetails = (props) => {
  const { LoadingComponent, loader, handleLoader } = useLoader();

  const familyDetails = useSelector((state) => {
    return {
      firstName: state.user.user.firstName,
      lastName: state.user.user.lastName,
      phoneNumber: state.user.user.phoneNumber,
      ...state.user.user.familyDetails,
    };
  });
  const token = useSelector((state) => state.user.user.token);
  const dispatch = useDispatch();
  const setEditMode = (value) => {
    props.setEditMode(value);
  };
  const {
    value: fatherHealthStatusInputValue,
    isValid: enteredFatherHealthStatusisValid,
    isError: fatherHealthStatusIsError,
    inputKeyStrockHandler: fatherHealthStatusKeyStrockHandler,
    inputBlurHandler: fatherHealthStatusInputBlurHandler,
    reset: resetFatherHealthStatusInput,
  } = useInput(
    familyDetails.fatherHealthStatus || "",
    (value) => !(value.trim().length < 1)
  );
  const {
    value: fatherWorkStatusInputValue,
    isValid: enteredFatherWorkStatusisValid,
    isError: fatherWorkStatusIsError,
    inputKeyStrockHandler: fatherWorkStatusKeyStrockHandler,
    inputBlurHandler: fatherWorkStatusInputBlurHandler,
    reset: resetFatherWorkStatusInput,
  } = useInput(
    familyDetails.fatherWorkStatus || "",
    (value) => !(value.trim().length < 1)
  );
  const {
    value: motherHealthStatusInputValue,
    isValid: enteredMotherHealthStatusisValid,
    isError: motherHealthStatusIsError,
    inputKeyStrockHandler: motherHealthStatusKeyStrockHandler,
    inputBlurHandler: motherHealthStatusInputBlurHandler,
    reset: resetMotherHealthStatusInput,
  } = useInput(
    familyDetails.motherHealthStatus || "",
    (value) => !(value.trim().length < 1)
  );
  const {
    value: motherWorkStatusInputValue,
    isValid: enteredMotherWorkStatusisValid,
    isError: motherWorkStatusIsError,
    inputKeyStrockHandler: motherWorkStatusKeyStrockHandler,
    inputBlurHandler: motherWorkStatusInputBlurHandler,
    reset: resetMotherWorkStatusInput,
  } = useInput(
    familyDetails.motherWorkStatus || "",
    (value) => !(value.trim().length < 1)
  );
  const {
    value: fatherNameInputValue,
    isValid: enteredFatherNameisValid,
    isError: fatherNameIsError,
    inputKeyStrockHandler: fatherNameKeyStrockHandler,
    inputBlurHandler: fatherNameInputBlurHandler,
    reset: resetFatherNameInput,
  } = useInput(
    familyDetails.fatherName || "",
    (value) => !(value.trim().length < 1)
  );
  const {
    value: relationWithApplicantInputValue,
    isValid: enteredRelationWithApplicantisValid,
    isError: relationWithApplicantIsError,
    inputKeyStrockHandler: relationWithApplicantKeyStrockHandler,
    inputBlurHandler: relationWithApplicantInputBlurHandler,
    reset: resetRelationWithApplicantInput,
  } = useInput(
    familyDetails.relationWithApplicant || "",
    (value) => !(value.trim().length < 1)
  );
  const {
    value: occupationInputValue,
    isValid: enteredOccupationisValid,
    isError: occupationIsError,
    inputKeyStrockHandler: occupationKeyStrockHandler,
    inputBlurHandler: occupationInputBlurHandler,
    reset: resetOccupationInput,
  } = useInput(
    familyDetails.occupation || "",
    (value) => !(value.trim().length < 1)
  );
  const {
    value: grossIncomeInputValue,
    isValid: enteredGrossIncomeisValid,
    isError: grossIncomeIsError,
    inputKeyStrockHandler: grossIncomeKeyStrockHandler,
    inputBlurHandler: grossIncomeInputBlurHandler,
    reset: resetGrossIncomeInput,
  } = useInput(familyDetails.grossIncome || "", (value) => {
    const incomeRegex = /^[0-9]+$/;
    return incomeRegex.test(value.trim());
  });
  const {
    value: residentialPhoneNumberInputValue,
    isValid: enteredResidentialPhoneNumberisValid,
    isError: residentialPhoneNumberIsError,
    inputKeyStrockHandler: residentialPhoneNumberKeyStrockHandler,
    inputBlurHandler: residentialPhoneNumberInputBlurHandler,
    reset: resetResidentialPhoneNumberInput,
  } = useInput(familyDetails.residentialPhoneNumber || "", (value) => {
    const phoneNoRegex = /^92\d{10}$/;
    return phoneNoRegex.test(value.trim());
  });
  const {
    value: officePhoneNumberInputValue,
    isValid: enteredOfficePhoneNumberisValid,
    isError: officePhoneNumberIsError,
    inputKeyStrockHandler: officePhoneNumberKeyStrockHandler,
    inputBlurHandler: officePhoneNumberInputBlurHandler,
    reset: resetOfficePhoneNumberInput,
  } = useInput(familyDetails.officePhoneNumber || "", (value) => {
    const phoneNoRegex = /^92\d{10}$/;
    return phoneNoRegex.test(value.trim());
  });
  const {
    value: monetaryAssistanceAmountInputValue,
    isValid: enteredMonetaryAssistanceAmountisValid,
    isError: monetaryAssistanceAmountIsError,
    inputKeyStrockHandler: monetaryAssistanceAmountKeyStrockHandler,
    inputBlurHandler: monetaryAssistanceAmountInputBlurHandler,
    reset: resetMonetaryAssistanceAmountInput,
  } = useInput(familyDetails.monetaryAssistanceAmount || "", (value) => {
    const incomeRegex = /^[0-9]+$/;
    return incomeRegex.test(value.trim());
  });
  const {
    value: addressInputValue,
    isValid: enteredAddressisValid,
    isError: addressIsError,
    inputKeyStrockHandler: addressKeyStrockHandler,
    inputBlurHandler: addressInputBlurHandler,
    reset: resetAddressInput,
  } = useInput(
    familyDetails.address || "",
    (value) => !(value.trim().length < 1)
  );
  const {
    value: districtInputValue,
    isValid: enteredDistrictisValid,
    isError: districtIsError,
    inputKeyStrockHandler: districtKeyStrockHandler,
    inputBlurHandler: districtInputBlurHandler,
    reset: resetDistrictInput,
  } = useInput(
    familyDetails.district || "",
    (value) => !(value.trim().length < 1)
  );
  const {
    value: cityInputValue,
    isValid: enteredCityisValid,
    isError: cityIsError,
    inputKeyStrockHandler: cityKeyStrockHandler,
    inputBlurHandler: cityInputBlurHandler,
    reset: resetCityInput,
  } = useInput(familyDetails.city || "", (value) => !(value.trim().length < 1));
  const {
    value: provinceInputValue,
    isValid: enteredProvinceisValid,
    isError: provinceIsError,
    inputKeyStrockHandler: provinceKeyStrockHandler,
    inputBlurHandler: provinceInputBlurHandler,
    reset: resetProvinceInput,
  } = useInput(
    familyDetails.province || "",
    (value) => !(value.trim().length < 1)
  );
  const {
    value: noOfEarnersInputValue,
    isValid: enteredNoOfEarnersisValid,
    isError: noOfEarnersIsError,
    inputKeyStrockHandler: noOfEarnersKeyStrockHandler,
    inputBlurHandler: noOfEarnersInputBlurHandler,
    reset: resetNoOfEarnersInput,
  } = useInput(familyDetails.noOfEarners || "", (value) => {
    const incomeRegex = /^[0-9]+$/;
    return incomeRegex.test(value.trim());
  });
  const {
    value: totalFamilyIncomeInputValue,
    isValid: enteredTotalFamilyIncomeisValid,
    isError: totalFamilyIncomeIsError,
    inputKeyStrockHandler: totalFamilyIncomeKeyStrockHandler,
    inputBlurHandler: totalFamilyIncomeInputBlurHandler,
    reset: resetTotalFamilyIncomeInput,
  } = useInput(familyDetails.totalFamilyIncome || "", (value) => {
    const incomeRegex = /^[0-9]+$/;
    return incomeRegex.test(value.trim());
  });
  const {
    value: totalNoOfDepandantsInputValue,
    isValid: enteredTotalNoOfDepandantsisValid,
    isError: totalNoOfDepandantsIsError,
    inputKeyStrockHandler: totalNoOfDepandantsKeyStrockHandler,
    inputBlurHandler: totalNoOfDepandantsInputBlurHandler,
    reset: resetTotalNoOfDepandantsInput,
  } = useInput(familyDetails.totalNoOfDepandants || "", (value) => {
    const totalNoOfDepandantsRegex = /^[A-Za-z]+$/;
    return totalNoOfDepandantsRegex.test(value.trim());
  });
  let formIsValid = false;
  if (
    enteredFatherHealthStatusisValid &&
    enteredMotherHealthStatusisValid &&
    enteredFatherWorkStatusisValid &&
    enteredMotherWorkStatusisValid &&
    enteredFatherNameisValid &&
    enteredRelationWithApplicantisValid &&
    enteredOccupationisValid &&
    enteredGrossIncomeisValid &&
    enteredResidentialPhoneNumberisValid &&
    enteredOfficePhoneNumberisValid &&
    enteredMonetaryAssistanceAmountisValid &&
    enteredNoOfEarnersisValid &&
    enteredTotalFamilyIncomeisValid &&
    enteredAddressisValid &&
    enteredDistrictisValid &&
    enteredCityisValid &&
    enteredProvinceisValid &&
    enteredTotalNoOfDepandantsisValid
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
      //preparing inputData to send
      const userData = {
        familyDetails: {
          fatherHealthStatus: fatherHealthStatusInputValue,
          motherHealthStatus: motherHealthStatusInputValue,
          fatherWorkStatus: fatherWorkStatusInputValue,
          motherWorkStatus: motherWorkStatusInputValue,
          fatherName: fatherNameInputValue,
          relationWithApplicant: relationWithApplicantInputValue,
          occupation: occupationInputValue,
          grossIncome: grossIncomeInputValue,
          residentialPhoneNumber: residentialPhoneNumberInputValue,
          officePhoneNumber: officePhoneNumberInputValue,
          monetaryAssistanceAmount: monetaryAssistanceAmountInputValue,
          address: addressInputValue,
          district: districtInputValue,
          city: cityInputValue,
          province: provinceInputValue,
          noOfEarners: noOfEarnersInputValue,
          totalFamilyIncome: totalFamilyIncomeInputValue,
          totalNoOfDepandants: totalNoOfDepandantsInputValue,
        },
      };
      handleLoader(true);
      //sending data
      const res = await fetch(`${BACKEND_DOMAIN}/family-details`, {
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
      dispatch(
        userActions.updateUserData({
          ...resData.updatedUserData,
        })
      );
      //here show success msg through notification
      toast.success(resData.message);

      resetFatherHealthStatusInput();
      resetMotherHealthStatusInput();
      resetFatherWorkStatusInput();
      resetMotherWorkStatusInput();
      resetFatherNameInput();
      resetRelationWithApplicantInput();
      resetOccupationInput();
      resetGrossIncomeInput();
      resetResidentialPhoneNumberInput();
      resetOfficePhoneNumberInput();
      resetMonetaryAssistanceAmountInput();
      resetAddressInput();
      resetDistrictInput();
      resetCityInput();
      resetProvinceInput();
      resetNoOfEarnersInput();
      resetTotalFamilyIncomeInput();
      resetTotalNoOfDepandantsInput();

      handleLoader(false);
      setEditMode(false);
    } catch (err) {
      console.log(err);
      handleLoader(false);
      toast.error("Updation failed!");
      throw new Error("Updation failed!");
    }
  };
  return (
    <div className={classes.section}>
      {loader && LoadingComponent}
      <form onSubmit={formSubmitHandler}>
        <div className={classes.headingDiv}>
          <h2>Parent Status</h2>
        </div>
        <hr></hr>
        <div className={classes.inputContainer}>
          <FormControl
            error={fatherHealthStatusIsError && true}
            variant="outlined"
            size="small"
            className={classes.formInput}
          >
            <InputLabel id="fatherHealthStatus-select-label">
              Father Health Status*
            </InputLabel>
            <Select
              labelId="fatherHealthStatus-select-label"
              id="fatherHealthStatus-select"
              label="Father Health Status"
              value={fatherHealthStatusInputValue}
              onChange={fatherHealthStatusKeyStrockHandler}
              onBlur={fatherHealthStatusInputBlurHandler}
            >
              <MenuItem value={"Alive"}>Alive</MenuItem>
              <MenuItem value={"Deceased"}>Deceased</MenuItem>
            </Select>
            <FormHelperText id="component-error-text">
              Select Father Health Status!
            </FormHelperText>
          </FormControl>
          <FormControl
            error={fatherWorkStatusIsError && true}
            variant="outlined"
            size="small"
            className={classes.formInput}
          >
            <InputLabel id="fatherWorkStatus-select-label">
              Father Work Status*
            </InputLabel>
            <Select
              labelId="fatherWorkStatus-select-label"
              id="fatherWorkStatus-select"
              label="Father Work Status"
              value={fatherWorkStatusInputValue}
              onChange={fatherWorkStatusKeyStrockHandler}
              onBlur={fatherWorkStatusInputBlurHandler}
            >
              <MenuItem value={"Retired"}>Retired</MenuItem>
              <MenuItem value={"In service"}>In service</MenuItem>
              <MenuItem value={"Business"}>Business</MenuItem>
            </Select>
            <FormHelperText id="component-error-text">
              Select Father Work Status!
            </FormHelperText>
          </FormControl>

          <FormControl
            error={motherHealthStatusIsError && true}
            variant="outlined"
            size="small"
            className={classes.formInput}
          >
            <InputLabel id="motherHealthStatus-select-label">
              Mother Health Status*
            </InputLabel>
            <Select
              labelId="motherHealthStatus-select-label"
              id="motherHealthStatus-select"
              label="Mother Health Status"
              value={motherHealthStatusInputValue}
              onChange={motherHealthStatusKeyStrockHandler}
              onBlur={motherHealthStatusInputBlurHandler}
            >
              <MenuItem value={"Alive"}>Alive</MenuItem>
              <MenuItem value={"Deceased"}>Deceased</MenuItem>
            </Select>
            <FormHelperText id="component-error-text">
              Select Mother Health Status!
            </FormHelperText>
          </FormControl>
          <FormControl
            error={motherWorkStatusIsError && true}
            variant="outlined"
            size="small"
            className={classes.formInput}
          >
            <InputLabel id="motherWorkStatus-select-label">
              Mother Work Status*
            </InputLabel>
            <Select
              labelId="motherWorkStatus-select-label"
              id="motherWorkStatus-select"
              label="Mother Work Status"
              value={motherWorkStatusInputValue}
              onChange={motherWorkStatusKeyStrockHandler}
              onBlur={motherWorkStatusInputBlurHandler}
            >
              <MenuItem value={"Retired"}>House Wife</MenuItem>
              <MenuItem value={"In service"}>In service</MenuItem>
              <MenuItem value={"Business"}>Business</MenuItem>
            </Select>
            <FormHelperText id="component-error-text">
              Select Mother Work Status!
            </FormHelperText>
          </FormControl>
        </div>
        <div className={classes.headingDiv}>
          <h2>Father/Guardian Details</h2>
        </div>
        <hr></hr>
        <div className={classes.inputContainer}>
          <TextField
            id="outlined-multiline-flexible-name"
            label="Name*"
            error={fatherNameIsError && true}
            size="small"
            className={classes.formInput}
            value={fatherNameInputValue}
            onChange={fatherNameKeyStrockHandler}
            onBlur={fatherNameInputBlurHandler}
            helperText={"Enter Father Name"}
          />
          <TextField
            id="outlined-multiline-flexible-relationWithApplicant"
            label="Relation With Applicant*"
            error={relationWithApplicantIsError && true}
            size="small"
            className={classes.formInput}
            value={relationWithApplicantInputValue}
            onChange={relationWithApplicantKeyStrockHandler}
            onBlur={relationWithApplicantInputBlurHandler}
            helperText={'e.g.:"Father"'}
          />
          <TextField
            id="outlined-multiline-flexible-occupation"
            label="Occupation*"
            error={occupationIsError && true}
            size="small"
            className={classes.formInput}
            value={occupationInputValue}
            onChange={occupationKeyStrockHandler}
            onBlur={occupationInputBlurHandler}
            helperText={'e.g.:"Sales man"'}
          />
          <TextField
            id="outlined-multiline-flexible-grossIncome"
            label="Gross Salary/Income*"
            error={grossIncomeIsError && true}
            size="small"
            type="number"
            className={classes.formInput}
            value={grossIncomeInputValue}
            onChange={grossIncomeKeyStrockHandler}
            onBlur={grossIncomeInputBlurHandler}
            helperText={'e.g.:"60000"'}
          />
          <TextField
            id="outlined-adornment-residentialPhoneNumber"
            label="Residential Phone Number*"
            error={residentialPhoneNumberIsError && true}
            size="small"
            className={classes.formInput}
            value={residentialPhoneNumberInputValue}
            onChange={residentialPhoneNumberKeyStrockHandler}
            onBlur={residentialPhoneNumberInputBlurHandler}
            helperText={'e.g.:"923230160444"'}
          />
          <TextField
            id="outlined-adornment-officePhoneNumber"
            label="Office Phone Number*"
            error={officePhoneNumberIsError && true}
            size="small"
            className={classes.formInput}
            value={officePhoneNumberInputValue}
            onChange={officePhoneNumberKeyStrockHandler}
            onBlur={officePhoneNumberInputBlurHandler}
            helperText={'e.g.:"923230160444"'}
          />
          <TextField
            id="outlined-multiline-flexible-monetaryAssistanceAmount"
            label="Monetary Assistance Amount*"
            error={monetaryAssistanceAmountIsError && true}
            size="small"
            type="number"
            className={classes.formInput}
            value={monetaryAssistanceAmountInputValue}
            onChange={monetaryAssistanceAmountKeyStrockHandler}
            onBlur={monetaryAssistanceAmountInputBlurHandler}
            helperText={'e.g.:"10000"'}
          />
          <TextField
            id="outlined-multiline-flexible-address"
            label="Residential Address*"
            multiline
            maxRows={4}
            error={addressIsError && true}
            size="small"
            className={`${classes.formInput} ${classes.fullWidth}`}
            value={addressInputValue}
            onChange={addressKeyStrockHandler}
            onBlur={addressInputBlurHandler}
            helperText={"Enter Address"}
          />
          <TextField
            id="outlined-multiline-flexible-district"
            label="District*"
            error={districtIsError && true}
            size="small"
            className={classes.formInput}
            value={districtInputValue}
            onChange={districtKeyStrockHandler}
            onBlur={districtInputBlurHandler}
            helperText={'e.g: "Karachi-South"'}
          />
          <TextField
            id="outlined-multiline-flexible-city"
            label="City*"
            error={cityIsError && true}
            size="small"
            className={classes.formInput}
            value={cityInputValue}
            onChange={cityKeyStrockHandler}
            onBlur={cityInputBlurHandler}
            helperText={'e.g: "Karachi"'}
          />
          <TextField
            id="outlined-multiline-flexible-province"
            label="Province*"
            error={provinceIsError && true}
            size="small"
            className={classes.formInput}
            value={provinceInputValue}
            onChange={provinceKeyStrockHandler}
            onBlur={provinceInputBlurHandler}
            helperText={'e.g: "Sindh"'}
          />
        </div>
        <div className={classes.headingDiv}>
          <h2>Father/Guardian Details</h2>
        </div>
        <hr></hr>
        <div className={classes.inputContainer}>
          <TextField
            id="outlined-multiline-flexible-noOfEarners"
            label="No Of Earners*"
            error={noOfEarnersIsError && true}
            size="small"
            type="number"
            className={classes.formInput}
            value={noOfEarnersInputValue}
            onChange={noOfEarnersKeyStrockHandler}
            onBlur={noOfEarnersInputBlurHandler}
            helperText={'e.g.:"3"'}
          />
          <TextField
            id="outlined-multiline-flexible-totalFamilyIncome"
            label="Total Family Income*"
            error={totalFamilyIncomeIsError && true}
            size="small"
            type="number"
            className={classes.formInput}
            value={totalFamilyIncomeInputValue}
            onChange={totalFamilyIncomeKeyStrockHandler}
            onBlur={totalFamilyIncomeInputBlurHandler}
            helperText={'e.g.:"100000"'}
          />
          <TextField
            id="outlined-multiline-flexible-totalNoOfDepandants"
            label="Total No Of Depandants*"
            error={totalNoOfDepandantsIsError && true}
            size="small"
            className={classes.formInput}
            value={totalNoOfDepandantsInputValue}
            onChange={totalNoOfDepandantsKeyStrockHandler}
            onBlur={totalNoOfDepandantsInputBlurHandler}
            helperText={'e.g.:"Three"'}
          />
        </div>
        <div className={classes.btnDiv}>
          <Button
            type="submit"
            variant="contained"
            className={classes.submitDiv}
          >
            Save Education
          </Button>
          <Button
            type="button"
            variant="outlined"
            onClick={() => setEditMode(false)}
            className={classes.cencelDiv}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};
export default EditFamilyDetails;
