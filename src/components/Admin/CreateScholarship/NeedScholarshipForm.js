import classes from "./NeedScholarshipForm.module.css";
import { useState, useEffect, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import useLoader from "../../../Hooks/UseLoader";
import { BACKEND_DOMAIN } from "../../../config";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import NoteAddOutlinedIcon from "@mui/icons-material/NoteAddOutlined";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import useInput from "../../../Hooks/UseInput";
import { TextField, Button } from "@mui/material";

const NeedScholarshipForm = (props) => {
  const scholarshipDetails = props.scholarshipData || {};
  const isCreating = scholarshipDetails.title ? false : true;
  //hooks and variables
  const [closeDate, setCloseDate] = useState(
    scholarshipDetails.closeDate
      ? dayjs(scholarshipDetails.closeDate.slice(0, -1))
      : null
  );
  const [scholarshipImg, setScholarshipImg] = useState({
    value: null,
    error: null,
  });
  const navigate = useNavigate();
  const { handleLoader, LoadingComponent, loader } = useLoader();
  const token = useSelector((state) => state.admin.admin.token);
  useEffect(() => {
    if (scholarshipDetails.image) {
      fetch(BACKEND_DOMAIN + `/scholarshipImg/${scholarshipDetails._id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
        .then((res) => {
          return res.blob();
        })
        .then((blobData) => {
          const file = new File(
            [blobData],
            `${scholarshipDetails.title}.${blobData.type.split("/")[1]}`,
            { type: blobData.type }
          );
          setScholarshipImg((prevState) => {
            return {
              value: file,
              error: null,
            };
          });
        })
        .catch((error) =>
          setScholarshipImg((prevState) => {
            return {
              value: null,
              error: error.message,
            };
          })
        );
    }
  }, []);
  //input properties
  const {
    value: titleInputValue,
    isValid: enteredTitleisValid,
    isError: titleIsError,
    inputKeyStrockHandler: titleKeyStrockHandler,
    inputBlurHandler: titleInputBlurHandler,
    reset: resetTitleInput,
  } = useInput(
    scholarshipDetails.title || "",
    (value) => !(value.trim().length < 1)
  );
  const {
    value: descriptionInputValue,
    isValid: enteredDescriptionisValid,
    isError: descriptionIsError,
    inputKeyStrockHandler: descriptionKeyStrockHandler,
    inputBlurHandler: descriptionInputBlurHandler,
    reset: resetDescriptionInput,
  } = useInput(
    scholarshipDetails.description || "",
    (value) => !(value.trim().length < 1)
  );
  const {
    value: eligibilityInputValue,
    isValid: enteredEligibilityisValid,
    isError: eligibilityIsError,
    inputKeyStrockHandler: eligibilityKeyStrockHandler,
    inputBlurHandler: eligibilityInputBlurHandler,
    reset: resetEligibilityInput,
  } = useInput(
    scholarshipDetails.eligibilityCriteria || "",
    (value) => !(value.trim().length < 1)
  );
  const {
    value: instructionsInputValue,
    isValid: enteredInstructionsisValid,
    isError: instructionsIsError,
    inputKeyStrockHandler: instructionsKeyStrockHandler,
    inputBlurHandler: instructionsInputBlurHandler,
    reset: resetInstructionsInput,
  } = useInput(
    scholarshipDetails.instructions || "",
    (value) => !(value.trim().length < 1)
  );

  let formIsValid = false;
  if (
    enteredTitleisValid &&
    enteredDescriptionisValid &&
    enteredEligibilityisValid &&
    enteredInstructionsisValid &&
    scholarshipImg.value &&
    closeDate
  ) {
    formIsValid = true;
  }

  //Handlers
  const handleDateChange = (date) => {
    setCloseDate(date);
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
        toast.error("Fill all inputs with valid data");
        return;
      }
      //preparing data
      const scholarshipData = {
        title: titleInputValue,
        closeDate: Date.parse(closeDate.$d),
        description: descriptionInputValue,
        eligibilityCriteria: eligibilityInputValue,
        instructions: instructionsInputValue,
      };
      handleLoader(true);
      //send json data to to server
      const res = await fetch(
        isCreating
          ? `${BACKEND_DOMAIN}/admin/create-scholarship`
          : `${BACKEND_DOMAIN}/admin/update-scholarship?scholarshipId=${scholarshipDetails._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify(scholarshipData),
        }
      );
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
      toast.success(
        isCreating
          ? "Scholarship created successfully!"
          : "Scholarship updated successfully!"
      );

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
      setCloseDate(null);
      if (!isCreating) {
        navigate("/admin/scholarship-list");
      }
    } catch (err) {
      console.log(err);
      handleLoader(false);
      toast.error("Scholarship creation failed");
      throw new Error("Scholarship creation failed");
    }
  };
  return (
    <form onSubmit={formSubmitHandler}>
      {loader && LoadingComponent}
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
              scholarshipImg.value && URL.createObjectURL(scholarshipImg.value)
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
            value={closeDate}
            onChange={handleDateChange}
            minDate={dayjs().add(1, "day")} // set minimum date to tomorrow
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
        <Button type="submit" variant="contained" className={classes.submitDiv}>
          {isCreating ? "Create Scholarship" : "Update Scholarship"}
        </Button>
        <Button
          type="button"
          variant="outlined"
          onClick={() => navigate(-1)}
          className={classes.cencelDiv}
        >
          Back
        </Button>
      </div>
    </form>
  );
};
export default NeedScholarshipForm;
