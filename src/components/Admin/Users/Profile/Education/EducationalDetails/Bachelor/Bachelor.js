// import classes from "./bachelor.module.css";
import MainSectionDiv from "../../../util/MainSectionDiv";
import Education from "../Education";

const Bachelor = (props) => {
  const { bachelor, userId } = props;

  const bachelorDetails = [
    { heading: "Class/Year", value: bachelor.class },
    { heading: "Seat No.", value: bachelor.seatNo },
    { heading: "Semester", value: bachelor.semester },
    { heading: "Total CGPA", value: bachelor.totalCGPA },
    { heading: "Obtained CGPA", value: bachelor.obtainedCGPA },
    { heading: "Merit Position (if any)", value: bachelor.meritPosition },
    { heading: "Marksheet", value: bachelor.marksheet },
  ];

  return (
    <MainSectionDiv heading="Bachelor Details">
      <Education
        userId={userId}
        educationName="bachelor"
        detailArr={bachelorDetails}
      />
    </MainSectionDiv>
  );
};

export default Bachelor;
