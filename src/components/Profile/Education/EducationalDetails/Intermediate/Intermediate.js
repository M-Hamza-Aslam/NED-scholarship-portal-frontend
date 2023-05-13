// import classes from "./intermediate.module.css";
import MainSectionDiv from "../../../util/MainSectionDiv";
import Education from "../Education";
import EditEducation from "../EditEducation";
import { useState } from "react";
import { useSelector } from "react-redux";

const Intermediate = () => {
  const [isEdit, setIsEdit] = useState(false);

  const intermediate = useSelector((state) => {
    return state.user.user.education.intermediate;
  });

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
    <MainSectionDiv
      heading="Intermediate Details"
      showEditIcon={true}
      setEditMode={(value) => {
        setIsEdit(value);
      }}
    >
      {isEdit ? (
        <EditEducation educationName="intermediate" setIsEdit={setIsEdit} />
      ) : (
        <Education
          educationName="intermediate"
          detailArr={intermediateDetails}
        />
      )}
    </MainSectionDiv>
  );
};

export default Intermediate;
