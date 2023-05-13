// import classes from "./Matric.module.css";
import MainSectionDiv from "../../../util/MainSectionDiv";
import Education from "../Education";
import EditEducation from "../EditEducation";
import { useState } from "react";
import { useSelector } from "react-redux";

const Matric = () => {
  const [isEdit, setIsEdit] = useState(false);

  const matric = useSelector((state) => {
    return state.user.user.education.matric;
  });

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
    <MainSectionDiv
      heading="Matric Details"
      showEditIcon={true}
      setEditMode={(value) => {
        setIsEdit(value);
      }}
    >
      {isEdit ? (
        <EditEducation educationName="matric" setIsEdit={setIsEdit} />
      ) : (
        <Education educationName="matric" detailArr={matricDetails} />
      )}
    </MainSectionDiv>
  );
};

export default Matric;
