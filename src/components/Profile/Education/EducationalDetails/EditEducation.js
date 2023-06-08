import classes from "./EditEducation.module.css";
import useInput from "../../../../Hooks/UseInput.js";
import { Button, MenuItem, TextField } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../../../../store/userSlice";
import { BACKEND_DOMAIN } from "../../../../config";
import useLoader from "../../../../Hooks/UseLoader";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { MuiFileInput } from "mui-file-input";
import {
  classOptions,
  meritPositionOptions,
} from "../../util/SelectInputOptions";

const EditEducation = (props) => {
  const { setIsEdit, educationName } = props;
  const { LoadingComponent, loader, handleLoader } = useLoader();
  let educationalDetailsObj = useSelector((state) => {
    return state.user.user.education[educationName];
  });
  const token = useSelector((state) => state.user.user.token);
  const dispatch = useDispatch();
  const [file, setFile] = useState({ value: null, error: false });

  const setIsEditHandler = (value) => {
    setIsEdit(value);
  };

  useEffect(() => {
    if (educationalDetailsObj.marksheet) {
      fetch(
        `${BACKEND_DOMAIN}/marksheet?marksheetName=${educationalDetailsObj.marksheet}&educationName=${educationName}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
        .then((res) => {
          return res.blob();
        })
        .then((blobData) => {
          const file = new File(
            [blobData],
            `${educationalDetailsObj.marksheet.split("-")[1]}`,
            { type: blobData.type }
          );
          setFile((prevState) => {
            return {
              value: file,
              error: false,
            };
          });
        })
        .catch((error) =>
          setFile((prevState) => {
            return {
              value: null,
              error: error.message,
            };
          })
        );
    }
  }, []);

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
    const RegexMarks = /^[0-9]+$/;
    const RegexCGPA = /^\d\.\d{1}$/;
    return RegexMarks.test(value.trim()) || RegexCGPA.test(value.trim());
  });
  const {
    value: obtainedMarksCGPAInputValue,
    isValid: enteredObtainedMarksCGPAisValid,
    isError: obtainedMarksCGPAIsError,
    inputKeyStrockHandler: obtainedMarksCGPAKeyStrockHandler,
    inputBlurHandler: obtainedMarksCGPAInputBlurHandler,
    reset: resetObtainedMarksCGPAInput,
  } = useInput(educationalDetailsObj.obtainedMarksCGPA || "", (value) => {
    const RegexMarks = /^[0-9]+$/;
    const RegexCGPA = /^\d\.\d{1}$/;
    const isLessThanTotal = +value.trim() <= +totalMarksCGPAInputValue;
    return (
      isLessThanTotal &&
      (RegexMarks.test(value.trim()) || RegexCGPA.test(value.trim()))
    );
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
    return Regex.test(value) && value <= 100;
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

  const handleFileChange = (newFile) => {
    // console.log(newFile);
    if (
      newFile &&
      newFile.type !==
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" &&
      newFile.type !== "application/pdf"
    ) {
      setFile((prevState) => {
        return {
          value: null,
          error: true,
        };
      });
      return;
    }
    setFile((prevState) => {
      return {
        value: newFile,
        error: false,
      };
    });
    //sending request to OCR
    if (newFile && BACKEND_DOMAIN === "http://localhost:8080") {
      handleLoader(true);
      const formData = new FormData();
      let URL;
      if (educationName === "matric") {
        URL = "http://localhost:5000/predict_SSC";
        formData.append("SSC", newFile);
      }
      if (educationName === "intermediate") {
        URL = "http://localhost:5000/predict_HSC";
        formData.append("HSC", newFile);
      }
      fetch(URL, {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          classKeyStrockHandler({ target: { value: data.class } });
          seatNoKeyStrockHandler({ target: { value: data.seatNo } });
          totalMarksCGPAKeyStrockHandler({
            target: { value: data.totalMarks },
          });
          obtainedMarksCGPAKeyStrockHandler({
            target: { value: data.obtainedMarks },
          });
          percentageKeyStrockHandler({
            target: { value: `${Math.round(data.percentage)}` },
          });

          handleLoader(false);
        })
        .catch((error) => {
          console.log(error);
          handleLoader(false);
        });
    }
  };

  let formIsValid = false;
  if (
    enteredClassisValid &&
    enteredSeatNoisValid &&
    enteredTotalMarksCGPAisValid &&
    enteredObtainedMarksCGPAisValid &&
    enteredPercentageisValid &&
    enteredMeritPositionisValid &&
    file.value
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
        educationName,
        // index,
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
        toast.error(resData.message);
        handleLoader(false);
        return;
      }
      // const resData = await res.json();

      //upload file
      const formData = new FormData();
      formData.append("marksheet", file.value);

      const marksheetRes = await fetch(
        `${BACKEND_DOMAIN}/upload-marksheet?educationName=${educationName}`,
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + token,
          },
          body: formData,
        }
      );
      if (marksheetRes.status !== 201) {
        //here show an error through notification
        const MarksheetResData = await marksheetRes.json();
        toast.error(MarksheetResData.message);
        handleLoader(false);
        return;
      }
      const MarksheetResData = await marksheetRes.json();
      //here show success msg through notification
      dispatch(
        userActions.updateUserData({
          ...MarksheetResData.updatedUserData,
        })
      );
      toast.success(MarksheetResData.message);

      resetClassInput();
      resetSeatNoInput();
      resetTotalMarksCGPAInput();
      resetObtainedMarksCGPAInput();
      resetPercentageInput();
      resetMeritPositionInput();
      setFile((prevState) => {
        return {
          value: null,
          error: false,
        };
      });

      handleLoader(false);
      setIsEditHandler(false);
    } catch (err) {
      console.log(err);
      handleLoader(false);
      toast.error("Failed to update Educational Details");
      throw new Error("User Signup failed!");
    }
  };
  return (
    <form onSubmit={formSubmitHandler}>
      {loader && LoadingComponent}
      <MuiFileInput
        className={classes.fileInput}
        size="small"
        value={file.value}
        onChange={handleFileChange}
        placeholder="Upload Marksheet"
        helperText={`File Types: .pdf,.docx "`}
        inputProps={{ accept: ".pdf , .docx" }}
        error={file.error}
      />
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
          onBlur={(event) => {
            obtainedMarksCGPAInputBlurHandler(event);
            if (!obtainedMarksCGPAIsError || !totalMarksCGPAIsError) {
              percentageKeyStrockHandler({
                target: {
                  value: Math.round(
                    (+obtainedMarksCGPAInputValue * 100) /
                      +totalMarksCGPAInputValue
                  ),
                },
              });
              percentageInputBlurHandler();
            }
          }}
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
          disabled
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
          select
        >
          {meritPositionOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
      </div>
      <div className={classes.btnDiv}>
        <Button type="submit" variant="contained" className={classes.submitDiv}>
          Save Education
        </Button>
        <Button
          type="button"
          variant="outlined"
          onClick={() => setIsEditHandler(false)}
          className={classes.cencelDiv}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};
export default EditEducation;
