import classes from "./EducationalDetails.module.css";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { Button } from "@mui/material";
import { Fragment, useState, useEffect } from "react";
import Education from "./Education";
import EditEducation from "./EditEducation";
import useFetch from "../../../Hooks/UseFetch";
import { useSelector } from "react-redux";

const EducationalDetails = (props) => {
  const { fetchData } = useFetch("http://localhost:8080/education-details");
  const token = useSelector((state) => state.user.user.token);
  const educationalDetails = useSelector((state) => {
    return {
      ...state.user.user.educationalDetails,
    };
  });
  useEffect(() => {
    const fetch = async () => {
      if (!educationalDetails.hasFetched) {
        const res = await fetchData(token);
        console.log(res);
      }
    };
    fetch();
  }, [educationalDetails.hasFetched, token, fetchData]);

  const [showNewAcademicRecordForm, setShowNewAcademicRecordForm] =
    useState(false);
  const showNewAcademicRecordFormHandler = (value) => {
    setShowNewAcademicRecordForm(value);
  };

  const educationalDetailsArr = educationalDetails.educationalDetailsArr.map(
    (item) => {
      return [
        { heading: "Class/Year", value: item.class },
        { heading: "Seat No.", value: item.seatNo },
        { heading: "Total Max Marks/CGPA", value: item.totalMarksCGPA },
        { heading: "Marks Obtained/CGPA", value: item.obtainedMarksCGPA },
        { heading: "Percentage", value: item.percentage },
        { heading: "Merit Position (if any)", value: item.meritPosition },
      ];
    }
  );

  // const educationalDetailsArr = [
  //   [
  //     { heading: "Class/Year", value: "2018" },
  //     { heading: "Seat No.", value: "356315" },
  //     { heading: "Total Max Marks/CGPA", value: "850" },
  //     { heading: "Marks Obtained/CGPA", value: "715" },
  //     { heading: "Percentage", value: "84%" },
  //     { heading: "Merit Position (if any)", value: "None" },
  //   ],
  //   [
  //     { heading: "Class/Year", value: "2020" },
  //     { heading: "Seat No.", value: "798673" },
  //     { heading: "Total Max Marks/CGPA", value: "1100" },
  //     { heading: "Marks Obtained/CGPA", value: "940" },
  //     { heading: "Percentage", value: "84%" },
  //     { heading: "Merit Position (if any)", value: "None" },
  //   ],
  // ];
  return (
    <div className={classes.section}>
      <div className={classes.headingDiv}>
        <h2>Academic Record of the Last Examination(S)</h2>
      </div>
      <hr></hr>
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
    </div>
  );
};
export default EducationalDetails;
