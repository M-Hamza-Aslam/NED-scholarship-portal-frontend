import classes from "./EditPersonalInfo.module.css";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
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
import { useState } from "react";
import defaultProfileImg from "../../../images/defaultProfileImg.jpg";
import { BACKEND_DOMAIN } from "../../../config";
import useLoader from "../../../Hooks/UseLoader";
import { toast } from "react-toastify";
import {
  classOptions,
  disciplineOptions,
  cityOptions,
  districtOptions,
  provinceOptions,
} from "../util/SelectInputOptions";

const EditPersonalInfo = (props) => {
  const { LoadingComponent, loader, handleLoader } = useLoader();
  const dispatch = useDispatch();
  const [profileImg, setProfileImg] = useState({
    value: null,
    error: null,
  });
  //data from redux
  const personalInfo = useSelector((state) => {
    return {
      firstName: state.user.user.firstName,
      lastName: state.user.user.lastName,
      phoneNumber: state.user.user.phoneNumber,
      profileImg: state.user.user.profileImg,
      ...state.user.user.personalInfo,
    };
  });
  const token = useSelector((state) => state.user.user.token);
  //show edit form handler
  const setEditMode = (value) => {
    props.setEditMode(value);
  };
  //image upload handler
  const profileImageUploadHandler = (event) => {
    const image = event.target.files[0];
    if (!image) {
      return;
    }
    if (image.type !== "image/jpeg" && image.type !== "image/png") {
      //show error here
      setProfileImg((prevState) => {
        return { value: null, error: "Only jpg and png types allowed!" };
      });
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setProfileImg((prevState) => {
        return { value: image, error: null };
      });
    };
    reader.readAsDataURL(image);
  };
  //input properties
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
        //show error
        toast.error("Fill all inputs with valid values!");
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
      handleLoader(true);
      //sending personalInfo data to server
      const res = await fetch(`${BACKEND_DOMAIN}/personal-info`, {
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
      let dataObj = { ...resData.updatedUserData };
      //sending image to server
      if (profileImg.value) {
        const formData = new FormData();
        formData.append("profileImg", profileImg.value);
        //sending data
        const resImg = await fetch(`${BACKEND_DOMAIN}/upload-profileImg`, {
          method: "POST",
          headers: {
            Authorization: "Bearer " + token,
          },
          body: formData,
        });
        if (resImg.status !== 201) {
          //here show an error through notification
          const resData = await resImg.json();
          toast.error(resData.message);

          return;
        }
        const ImgData = await resImg.json();
        dataObj.profileImg = ImgData.profileImg;
        dataObj.profileStatus = ImgData.profileStatus;
      }
      dispatch(userActions.updateUserData(dataObj));
      //here show success msg through notification
      toast.success("Personal information has been updated!");

      setProfileImg({
        value: null,
        error: null,
      });
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

      handleLoader(false);
      setEditMode(false);

      //
    } catch (err) {
      console.log(err);
      handleLoader(false);
      toast.error("Updation failed");
      throw new Error("Updation failed");
    }
  };
  return (
    <div className={classes.section}>
      {loader && LoadingComponent}
      <form onSubmit={formSubmitHandler}>
        <div className={classes.headingDiv}>
          <h2>Tell Us About Yourself</h2>
        </div>
        <hr></hr>
        <div className={classes.imgDiv}>
          <img
            src={
              profileImg.value
                ? URL.createObjectURL(profileImg.value)
                : defaultProfileImg
            }
            alt="upload"
          />
          <Button
            startIcon={<AddCircleOutlineOutlinedIcon />}
            variant="contained"
            onClick={() => {
              document.getElementById("imageUpload").click();
            }}
            className={classes.submitDiv}
          >
            Upload a new Photo
          </Button>
          <input
            type="file"
            id="imageUpload"
            accept=".png, .jpg, .jpeg"
            onChange={profileImageUploadHandler}
          />
        </div>
        {profileImg.error && (
          <p className={classes.error}>{profileImg.error}</p>
        )}
        {profileImg.value && <p>{profileImg.value.name}</p>}
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
            helperText={classIsError ? "Incorrect Class!" : "Select Your Class"}
            select
          >
            {classOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
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
            select
          >
            {disciplineOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
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
            select
          >
            {classOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
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
            id="outlined-multiline-flexible-residentialProvince"
            label="Province*"
            error={residentialProvinceIsError && true}
            size="small"
            className={classes.formInput}
            value={residentialProvinceInputValue}
            // onChange={residentialProvinceKeyStrockHandler}
            onBlur={residentialProvinceInputBlurHandler}
            onChange={(event) => {
              residentialProvinceKeyStrockHandler(event);
              residentialCityKeyStrockHandler({ target: { value: "" } });
              residentialDistrictKeyStrockHandler({ target: { value: "" } });
            }}
            helperText={'e.g: "Sindh"'}
            select
          >
            {provinceOptions.map((option) => (
              <MenuItem key={option.name} value={option.name}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="outlined-multiline-flexible-residentialCity"
            label="City*"
            error={residentialCityIsError && true}
            size="small"
            className={classes.formInput}
            value={residentialCityInputValue}
            onChange={(event) => {
              residentialCityKeyStrockHandler(event);
              residentialDistrictKeyStrockHandler({ target: { value: "" } });
            }}
            onBlur={residentialCityInputBlurHandler}
            helperText={
              residentialProvinceInputValue.length < 1
                ? "Select province first"
                : 'e.g: "Select your city"'
            }
            select
            disabled={residentialProvinceInputValue.length < 1 ? true : false}
          >
            {cityOptions
              .filter((city) => city.province === residentialProvinceInputValue)
              .map((option) => (
                <MenuItem key={option.name} value={option.name}>
                  {option.name}
                </MenuItem>
              ))}
          </TextField>
          <TextField
            id="outlined-multiline-flexible-residentialDistrict"
            label="District*"
            error={residentialDistrictIsError && true}
            size="small"
            className={classes.formInput}
            value={residentialDistrictInputValue}
            onChange={residentialDistrictKeyStrockHandler}
            onBlur={residentialDistrictInputBlurHandler}
            helperText={
              residentialCityInputValue.length < 1
                ? "Select city first"
                : 'e.g: "Select your district"'
            }
            select
            disabled={residentialCityInputValue.length < 1 ? true : false}
          >
            {districtOptions
              .filter((district) => district.city === residentialCityInputValue)
              .map((option) => (
                <MenuItem key={option.name} value={option.name}>
                  {option.name}
                </MenuItem>
              ))}
          </TextField>
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
            id="outlined-multiline-flexible-permanentProvince"
            label="Province*"
            error={permanentProvinceIsError && true}
            size="small"
            className={classes.formInput}
            value={permanentProvinceInputValue}
            onBlur={permanentProvinceInputBlurHandler}
            onChange={(event) => {
              permanentProvinceKeyStrockHandler(event);
              permanentCityKeyStrockHandler({ target: { value: "" } });
              permanentDistrictKeyStrockHandler({ target: { value: "" } });
            }}
            helperText={'e.g: "Sindh"'}
            select
          >
            {provinceOptions.map((option) => (
              <MenuItem key={option.name} value={option.name}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="outlined-multiline-flexible-permanentCity"
            label="City*"
            error={permanentCityIsError && true}
            size="small"
            className={classes.formInput}
            value={permanentCityInputValue}
            onChange={(event) => {
              permanentCityKeyStrockHandler(event);
              permanentDistrictKeyStrockHandler({ target: { value: "" } });
            }}
            onBlur={permanentCityInputBlurHandler}
            helperText={
              permanentProvinceInputValue.length < 1
                ? "Select province first"
                : 'e.g: "Select your city"'
            }
            select
            disabled={permanentProvinceInputValue.length < 1 ? true : false}
          >
            {cityOptions
              .filter((city) => city.province === permanentProvinceInputValue)
              .map((option) => (
                <MenuItem key={option.name} value={option.name}>
                  {option.name}
                </MenuItem>
              ))}
          </TextField>
          <TextField
            id="outlined-multiline-flexible-permanentDistrict"
            label="District*"
            error={permanentDistrictIsError && true}
            size="small"
            className={classes.formInput}
            value={permanentDistrictInputValue}
            onChange={permanentDistrictKeyStrockHandler}
            onBlur={permanentDistrictInputBlurHandler}
            helperText={
              permanentCityInputValue.length < 1
                ? "Select city first"
                : 'e.g: "Select your district"'
            }
            select
            disabled={permanentCityInputValue.length < 1 ? true : false}
          >
            {districtOptions
              .filter((district) => district.city === permanentCityInputValue)
              .map((option) => (
                <MenuItem key={option.name} value={option.name}>
                  {option.name}
                </MenuItem>
              ))}
          </TextField>
        </div>
        <div className={classes.btnDiv}>
          <Button
            type="submit"
            variant="contained"
            className={classes.submitDiv}
          >
            Save Personal Info
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
export default EditPersonalInfo;
