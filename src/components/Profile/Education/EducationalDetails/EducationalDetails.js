import classes from "./EducationalDetails.module.css";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { Button } from "@mui/material";
import { Fragment, useState } from "react";
import Education from "./Education";
import EditEducation from "./EditEducation";
import { useSelector } from "react-redux";
import MainSectionDiv from "../../util/MainSectionDiv";
import LoadingDiv from "../../util/LoadingDiv";

const EducationalDetails = (props) => {
  const { loading } = props;
  const educationalDetails = useSelector((state) => {
    return state.user.user.education?.educationalDetails;
  });

  const [showNewAcademicRecordForm, setShowNewAcademicRecordForm] =
    useState(false);
  const showNewAcademicRecordFormHandler = (value) => {
    setShowNewAcademicRecordForm(value);
  };
  let educationalDetailsArr = [];
  if (educationalDetails.length !== 0) {
    educationalDetailsArr = educationalDetails.map((item) => {
      return [
        { heading: "Class/Year", value: item.class },
        { heading: "Seat No.", value: item.seatNo },
        { heading: "Total Max Marks/CGPA", value: item.totalMarksCGPA },
        { heading: "Marks Obtained/CGPA", value: item.obtainedMarksCGPA },
        { heading: "Percentage", value: item.percentage },
        { heading: "Merit Position (if any)", value: item.meritPosition },
      ];
    });
  }
  return (
    <MainSectionDiv heading="Academic Record of the Last Examination(S)">
      {loading ? (
        <LoadingDiv />
      ) : (
        <div className={classes.mainDiv}>
          {showNewAcademicRecordForm ? (
            <>
              <EditEducation
                index={-1}
                setIsEdit={() => showNewAcademicRecordFormHandler(false)}
              />
              <hr></hr>
            </>
          ) : (
            <Button
              variant="contained"
              startIcon={<AddCircleOutlineOutlinedIcon />}
              onClick={showNewAcademicRecordFormHandler}
              className={classes.addBtn}
            >
              Add Education
            </Button>
          )}
          {educationalDetailsArr.map((detailArr, index) => {
            return (
              <Fragment key={index}>
                {index !== 0 && <hr></hr>}
                <Education index={index} detailArr={detailArr} />
              </Fragment>
            );
          })}
        </div>
      )}
    </MainSectionDiv>
  );
};
export default EducationalDetails;
