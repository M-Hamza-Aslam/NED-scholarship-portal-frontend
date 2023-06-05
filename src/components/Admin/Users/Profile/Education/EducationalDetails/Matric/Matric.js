// import classes from "./Matric.module.css";
import MainSectionDiv from "../../../util/MainSectionDiv";
import Education from "../Education";

const Matric = (props) => {
  const { matric, userId } = props;

  const matricDetails = [
    { heading: "Class/Year", value: matric.class },
    { heading: "Seat No.", value: matric.seatNo },
    { heading: "Total Max Marks/CGPA", value: matric.totalMarksCGPA },
    { heading: "Marks Obtained/CGPA", value: matric.obtainedMarksCGPA },
    { heading: "Percentage", value: matric.percentage },
    { heading: "Merit Position (if any)", value: matric.meritPosition },
    { heading: "Marksheet", value: matric.marksheet },
  ];

  return (
    <MainSectionDiv heading="Matric Details">
      <Education
        userId={userId}
        educationName="matric"
        detailArr={matricDetails}
      />
    </MainSectionDiv>
  );
};

export default Matric;
