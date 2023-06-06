import classes from "./EditRequirement.module.css";
import {
  TextField,
  Button,
  MenuItem,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import {
  typeOptions,
  validationOptions,
} from "../../../Profile/util/SelectInputOptions";
import { useState } from "react";
import useInput from "../../../../Hooks/UseInput";
import { toast } from "react-toastify";

const EditRequirement = (props) => {
  const { reqDetail, index, setIsEdit, updateRequirements } = props;
  const [isRequired, setIsRequired] = useState(reqDetail.required || true);
  const {
    value: labelInputValue,
    isValid: enteredLabelisValid,
    isError: labelIsError,
    inputKeyStrockHandler: labelKeyStrockHandler,
    inputBlurHandler: labelInputBlurHandler,
    reset: resetLabelInput,
  } = useInput(reqDetail.label || "", (value) => !(value.trim().length < 1));
  const {
    value: typeInputValue,
    isValid: enteredTypeisValid,
    isError: typeIsError,
    inputKeyStrockHandler: typeKeyStrockHandler,
    inputBlurHandler: typeInputBlurHandler,
    reset: resetTypeInput,
  } = useInput(reqDetail.type || "", (value) => !(value.trim().length < 1));
  const {
    value: validationInputValue,
    isValid: enteredvalidationisValid,
    isError: validationIsError,
    inputKeyStrockHandler: validationKeyStrockHandler,
    inputBlurHandler: validationInputBlurHandler,
    reset: resetvalidationInput,
  } = useInput(
    reqDetail.validation || "",
    (value) => !(value.trim().length < 1)
  );

  const NewRequirementHandler = () => {
    const isValid =
      enteredLabelisValid && enteredTypeisValid && enteredvalidationisValid;
    if (!isValid) {
      //show error
      toast.error("Fill all inputs with valid data");
      return;
    }
    const newRequirement = {
      label: labelInputValue,
      type: typeInputValue,
      validation: validationInputValue,
      required: isRequired,
    };
    if (index === -1) {
      updateRequirements((requirements) => {
        return [...requirements, newRequirement];
      });
    }
    updateRequirements((requirements) => {
      requirements[index] = newRequirement;
      return [...requirements];
    });
    resetLabelInput();
    resetTypeInput();
    resetvalidationInput();
    setIsRequired(true);
    setIsEdit();
  };
  return (
    <div className={classes.newRequirement}>
      <>
        <TextField
          id="outlined-adornment-label"
          label="Label"
          error={labelIsError && true}
          className={classes.formInput}
          type="text"
          value={labelInputValue}
          onChange={labelKeyStrockHandler}
          onBlur={labelInputBlurHandler}
          helperText={labelIsError ? "Incorrect Lable" : "Enter Label of Input"}
        />
        <TextField
          id="outlined-adornment-type"
          label="Type"
          error={typeIsError && true}
          className={classes.formInput}
          type="text"
          value={typeInputValue}
          onChange={(event) => {
            typeKeyStrockHandler(event);
            validationKeyStrockHandler({ target: { value: "" } });
          }}
          onBlur={typeInputBlurHandler}
          helperText={typeIsError ? "Incorrect Type!" : "Enter Type of nput"}
          select
        >
          {typeOptions.map((type) => (
            <MenuItem key={type.value} value={type.value}>
              {type.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="outlined-adornment-validation"
          label="validation"
          error={validationIsError && true}
          className={classes.formInput}
          type="text"
          value={validationInputValue}
          onChange={validationKeyStrockHandler}
          onBlur={validationInputBlurHandler}
          helperText={
            validationIsError
              ? "Incorrect Validation!"
              : typeInputValue.length < 1
              ? "Select type First"
              : "Enter validation method for input"
          }
          select
          disabled={typeInputValue.length < 1 ? true : false}
        >
          {validationOptions
            .filter((validation) => validation.type === typeInputValue)
            .map((validation) => (
              <MenuItem key={validation.value} value={validation.value}>
                {validation.label}
              </MenuItem>
            ))}
        </TextField>
        <FormControl className={classes.formInput}>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={isRequired}
            onChange={(e) => {
              if (e.target.value === "true") {
                setIsRequired(true);
              } else {
                setIsRequired(false);
              }
            }}
          >
            <FormControlLabel
              value="true"
              control={<Radio />}
              label="Required"
            />
            <FormControlLabel
              value="false"
              control={<Radio />}
              label="Optional"
            />
          </RadioGroup>
        </FormControl>
        <div className={classes.btnDiv}>
          <Button
            variant="contained"
            onClick={NewRequirementHandler}
            className={classes.addBtn}
          >
            {index === -1 ? "Add Requirement" : "Update Requirement"}
          </Button>
          <Button
            type="button"
            variant="outlined"
            onClick={() => setIsEdit()}
            className={classes.cencelDiv}
          >
            cancel
          </Button>
        </div>
      </>
    </div>
  );
};
export default EditRequirement;
