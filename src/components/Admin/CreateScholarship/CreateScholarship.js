import classes from "./CreateScholarship.module.css";
import { TextField, Button } from "@mui/material";
import useInput from "../../../Hooks/UseInput";
import MainSectionDiv from "../../Profile/util/MainSectionDiv";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import NoteAddOutlinedIcon from "@mui/icons-material/NoteAddOutlined";
import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import useLoader from "../../../Hooks/UseLoader";
import { BACKEND_DOMAIN } from "../../../config";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const CreateScholarship = () => {
  //hooks and variables
  const [closedDate, setClosedDate] = useState(null);
  const [scholarshipImg, setScholarshipImg] = useState({
    value: null,
    error: null,
  });
  const navigate = useNavigate();
  const { handleLoader, LoadingComponent, loader } = useLoader();
  const token = useSelector((state) => state.admin.admin.token);
  //input properties
  const {
    value: titleInputValue,
    isValid: enteredTitleisValid,
    isError: titleIsError,
    inputKeyStrockHandler: titleKeyStrockHandler,
    inputBlurHandler: titleInputBlurHandler,
    reset: resetTitleInput,
  } = useInput("", (value) => !(value.trim().length < 1));
  const {
    value: descriptionInputValue,
    isValid: enteredDescriptionisValid,
    isError: descriptionIsError,
    inputKeyStrockHandler: descriptionKeyStrockHandler,
    inputBlurHandler: descriptionInputBlurHandler,
    reset: resetDescriptionInput,
  } = useInput("", (value) => !(value.trim().length < 1));
  const {
    value: eligibilityInputValue,
    isValid: enteredEligibilityisValid,
    isError: eligibilityIsError,
    inputKeyStrockHandler: eligibilityKeyStrockHandler,
    inputBlurHandler: eligibilityInputBlurHandler,
    reset: resetEligibilityInput,
  } = useInput("", (value) => !(value.trim().length < 1));
  const {
    value: instructionsInputValue,
    isValid: enteredInstructionsisValid,
    isError: instructionsIsError,
    inputKeyStrockHandler: instructionsKeyStrockHandler,
    inputBlurHandler: instructionsInputBlurHandler,
    reset: resetInstructionsInput,
  } = useInput("", (value) => !(value.trim().length < 1));

  let formIsValid = false;
  if (
    enteredTitleisValid &&
    enteredDescriptionisValid &&
    enteredEligibilityisValid &&
    enteredInstructionsisValid &&
    scholarshipImg.value &&
    closedDate
  ) {
    formIsValid = true;
  }

  //Handlers
  const handleDateChange = (date) => {
    setClosedDate(date);
  };
  const handleFileInputChange = (event) => {
    const image = event.target.files[0];
    if (!image) {
      return;
    }
    if (image.type !== "image/jpeg" && image.type !== "image/png") {
      //show error here
      setScholarshipImg((prevState) => {
        return { value: null, error: "Only jpg and png types allowed!" };
      });
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setScholarshipImg((prevState) => {
        return { value: image, error: null };
      });
    };
    reader.readAsDataURL(image);
  };
  //Form Submit
  const formSubmitHandler = async (event) => {
    try {
      event.preventDefault();
      if (!formIsValid) {
        //show error
        toast.error("Fil all inputs with valid data");
        return;
      }
      //preparing data
      const scholarshipData = {
        title: titleInputValue,
        closeDate: Date.parse(closedDate.$d),
        description: descriptionInputValue,
        eligibilityCriteria: eligibilityInputValue,
        instructions: instructionsInputValue,
      };
      handleLoader(true);
      //send json data to to server
      const res = await fetch(`${BACKEND_DOMAIN}/admin/create-scholarship`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(scholarshipData),
      });
      if (res.status !== 201) {
        //here show an error through notification
        const resData = await res.json();
        toast.error(resData.message);
        return;
      }
      const resData = await res.json();
      let dataObj = { ...resData.scholarshipDetails };
      //sending image to server
      if (scholarshipImg.value) {
        const formData = new FormData();
        formData.append("scholarshipImg", scholarshipImg.value);
        formData.append("scholarshipId", dataObj._id);

        //sending data
        const resImg = await fetch(
          `${BACKEND_DOMAIN}/admin/upload-scholarshipImg`,
          {
            method: "POST",
            headers: {
              Authorization: "Bearer " + token,
            },
            body: formData,
          }
        );
        if (resImg.status !== 201) {
          //here show an error through notification
          const resData = await resImg.json();
          toast.error(resData.message);
          return;
        }
        const ImgData = await resImg.json();
        dataObj.image = ImgData.image;
      }
      toast.success("Scholarship created successfully!");

      handleLoader(false);
      //resetting inputs
      resetTitleInput();
      resetDescriptionInput();
      resetEligibilityInput();
      resetInstructionsInput();
      setScholarshipImg((prevState) => {
        return {
          value: null,
          error: null,
        };
      });
      setClosedDate(null);
    } catch (err) {
      console.log(err);
      handleLoader(false);
      toast.error("Scholarship creation failed");
      throw new Error("Scholarship creation failed");
    }
  };
  return (
    <div className={classes.container}>
      {loader && LoadingComponent}
      <div className={classes.mainDiv}>
        <MainSectionDiv heading="Create a New Scholarship">
          <div className={classes.formDiv}>
            <form onSubmit={formSubmitHandler}>
              <TextField
                id="outlined-adornment-title"
                label="Title*"
                error={titleIsError && true}
                // size="small"
                className={classes.formInput}
                value={titleInputValue}
                onChange={titleKeyStrockHandler}
                onBlur={titleInputBlurHandler}
                helperText={titleIsError ? "Incorrect Title!" : "Enter Title"}
              />

              <div
                className={classes.imageInput}
                onClick={() => {
                  document.getElementById("imageUpload").click();
                }}
              >
                {scholarshipImg.value && (
                  <img
                    src={
                      scholarshipImg.value &&
                      URL.createObjectURL(scholarshipImg.value)
                    }
                    alt="scholarship"
                    width="100%"
                    height="100%"
                  />
                )}
                <input
                  type="file"
                  id="imageUpload"
                  accept=".png, .jpg, .jpeg"
                  onChange={handleFileInputChange}
                  hidden
                />
                {!scholarshipImg.value && (
                  <Fragment>
                    <NoteAddOutlinedIcon />
                    <p>upload image</p>
                  </Fragment>
                )}
                {scholarshipImg.error && (
                  <p className={classes.error}>{scholarshipImg.error}</p>
                )}
              </div>

              <div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Close Date"
                    value={closedDate}
                    onChange={handleDateChange}
                  />
                </LocalizationProvider>
              </div>
              <TextField
                id="outlined-multiline-flexible-description"
                label="Description*"
                multiline
                rows={5}
                error={descriptionIsError && true}
                className={`${classes.formInput} ${classes.fullWidth}`}
                value={descriptionInputValue}
                onChange={descriptionKeyStrockHandler}
                onBlur={descriptionInputBlurHandler}
                helperText={"Enter Description"}
              />
              <TextField
                id="outlined-multiline-flexible-eligibility"
                label="Eligibility Criteria*"
                multiline
                rows={5}
                error={eligibilityIsError && true}
                className={`${classes.formInput} ${classes.fullWidth}`}
                value={eligibilityInputValue}
                onChange={eligibilityKeyStrockHandler}
                onBlur={eligibilityInputBlurHandler}
                helperText={"Enter Eligibility Criteria"}
              />
              <TextField
                id="outlined-multiline-flexible-instructions"
                label="Instructions*"
                multiline
                rows={5}
                error={instructionsIsError && true}
                className={`${classes.formInput} ${classes.fullWidth}`}
                value={instructionsInputValue}
                onChange={instructionsKeyStrockHandler}
                onBlur={instructionsInputBlurHandler}
                helperText={"Enter Instructions"}
              />
              <div className={classes.btnDiv}>
                <Button
                  type="submit"
                  variant="contained"
                  className={classes.submitDiv}
                >
                  Create Scholarship
                </Button>
                <Button
                  type="button"
                  variant="outlined"
                  onClick={() => navigate("/admin/scholarship-list")}
                  className={classes.cencelDiv}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </MainSectionDiv>
      </div>
    </div>
  );
};
export default CreateScholarship;
