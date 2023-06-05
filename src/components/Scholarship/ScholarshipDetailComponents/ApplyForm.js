import React, { Fragment, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import EastIcon from "@mui/icons-material/East";

import classes from "./ApplyForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { postApplyScholarship } from "../../../api";
import { toast } from "react-toastify";
import { userActions } from "../../../store/userSlice";
import { TextField } from "@mui/material";

const ApplyForm = ({ message, data, canApply }) => {
  const [open, setOpen] = useState(false);
  const [additionalReqs, setAdditionalReqs] = useState({});
  const auth = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleError = () => {
    toast.error(message);
  };

  const setAdditionalReqsHandler = (event) => {
    setAdditionalReqs((prevState) => ({
      ...prevState,
      [event.target.name.replaceAll(" ", "")]:
        event.target.files || event.target.value,
    }));
  };

  const applyScholarshipHandler = async (event) => {
    event.preventDefault();
    console.log(additionalReqs);
    return;
    const success = await postApplyScholarship(
      data._id,
      auth.token,
      additionalReqs
    );
    if (success) {
      dispatch(
        userActions.updateUserData({
          scholarship: {
            hasFetched: true,
            scholarshipList: success.appliedScholarships,
          },
        })
      );
      toast.success("You have successsfully applied to the scholarship!");
      handleClose();
    }
  };

  return (
    <Fragment>
      <div className={classes["apply-button"]}>
        <button
          onClick={canApply ? handleClickOpen : handleError}
          id={!canApply && classes.disable}
          className={classes.btn}
        >
          <span className={classes["btn-text"]}>
            Apply on Scholarship <EastIcon sx={{ marginLeft: "5px" }} />
          </span>
        </button>
      </div>
      <Dialog
        fullScreen={true}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        className={classes["apply-form"]}
      >
        <form onSubmit={applyScholarshipHandler} className={classes.dialog}>
          <DialogTitle className={classes.title} id="responsive-dialog-title">
            <h1>Apply for {data.title}?</h1>
            <hr />
          </DialogTitle>
          <DialogContent>
            <DialogContentText className={classes.text}>
              <p>
                Please note that you are currently signed in as
                <strong> {auth.email}</strong>. If you want to review or update
                your information, please <Link to="/profile">click here</Link>.
              </p>
              <p>
                All your current information will be shared once you apply for
                the scholarship.
              </p>
            </DialogContentText>

            <div className={classes["other-fields"]}>
              <h1>Other Requirements</h1>
              {data.otherRequirements.map((req) =>
                req.type === "file" ? (
                  <TextField
                    type={req.type}
                    id={req.label}
                    label={req.label}
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                    required={req.required}
                    inputProps={{
                      accept:
                        req.validation === "pdf" ? "application/pdf" : "all",
                    }}
                    name={req.label}
                    onChange={setAdditionalReqsHandler}
                  />
                ) : (
                  <TextField
                    type={req.type}
                    id={req.label}
                    label={req.label}
                    variant="outlined"
                    required={req.required}
                    multiline={req.validation === "multiline"}
                    rows="3"
                    name={req.label}
                    onChange={setAdditionalReqsHandler}
                  />
                )
              )}
            </div>
          </DialogContent>

          <DialogActions>
            <Button sx={{ color: "#0f2d25" }} autoFocus onClick={handleClose}>
              Disagree
            </Button>
            <Button
              variant="outlined"
              sx={{
                borderColor: "#0f2d25",
                backgroundColor: "#0f2d25",
                color: "white",
                "&:hover": {
                  backgroundColor: "#0f2d25",
                  borderColor: "#0f2d25",
                },
              }}
              // onClick={applyScholarshipHandler}
              type="submit"
              autoFocus
            >
              Agree
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Fragment>
  );
};

export default ApplyForm;
