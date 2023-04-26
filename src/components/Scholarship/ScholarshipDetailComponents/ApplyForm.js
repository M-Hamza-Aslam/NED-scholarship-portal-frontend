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

const ApplyForm = ({ data, canApply }) => {
  const [open, setOpen] = useState(false);
  const auth = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleError = () => {
    if (auth.profileStatus !== 100) {
      toast.error("Please make sure your profile is 100% completed.");
      return;
    }
    toast.error("You cannot apply to a scholarship again!");
  };

  const applyScholarshipHandler = async () => {
    const success = await postApplyScholarship(data._id, auth.token);
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
      >
        <div className={classes.dialog}>
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
              onClick={applyScholarshipHandler}
              autoFocus
            >
              Agree
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    </Fragment>
  );
};

export default ApplyForm;
