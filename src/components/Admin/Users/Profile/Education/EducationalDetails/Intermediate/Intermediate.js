// import classes from "./intermediate.module.css";
import MainSectionDiv from "../../../util/MainSectionDiv";
import Education from "../Education";

const Intermediate = (props) => {
  const { intermediate, userId } = props;

  const intermediateDetails = [
    { heading: "Class/Year", value: intermediate.class },
    { heading: "Seat No.", value: intermediate.seatNo },
    { heading: "Total Max Marks/CGPA", value: intermediate.totalMarksCGPA },
    { heading: "Marks Obtained/CGPA", value: intermediate.obtainedMarksCGPA },
    { heading: "Percentage", value: intermediate.percentage },
    { heading: "Merit Position (if any)", value: intermediate.meritPosition },
    { heading: "Marksheet", value: intermediate.marksheet },
  ];

  return (
    <MainSectionDiv heading="Intermediate Details">
      <Education
        userId={userId}
        educationName="intermediate"
        detailArr={intermediateDetails}
      />
    </MainSectionDiv>
  );
};

export default Intermediate;
