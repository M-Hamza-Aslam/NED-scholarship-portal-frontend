import classes from "./EducationalDetails.module.css";
import { Fragment } from "react";
import Education from "./Education";
import MainSectionDiv from "../../util/MainSectionDiv";

const EducationalDetails = (props) => {
  const { educationalDetails } = props;
  const educationalDetailsArr = educationalDetails.map((item) => {
    return [
      { heading: "Class/Year", value: item.class },
      { heading: "Seat No.", value: item.seatNo },
      { heading: "Total Max Marks/CGPA", value: item.totalMarksCGPA },
      { heading: "Marks Obtained/CGPA", value: item.obtainedMarksCGPA },
      { heading: "Percentage", value: item.percentage },
      { heading: "Merit Position (if any)", value: item.meritPosition },
    ];
  });
  return (
    <MainSectionDiv heading="Academic Record of the Last Examination(S)">
      <div className={classes.mainDiv}>
        {educationalDetailsArr.map((detailArr, index) => {
          return (
            <Fragment key={index}>
              {index !== 0 && <hr></hr>}
              <Education index={index} detailArr={detailArr} />
            </Fragment>
          );
        })}
      </div>
    </MainSectionDiv>
  );
};
export default EducationalDetails;
