// import classes from "./bachelor.module.css";
import MainSectionDiv from "../../../util/MainSectionDiv";
import Education from "../Education";
import { useState } from "react";
import { useSelector } from "react-redux";
import EditBachelor from "./EditBachelor";

const Bachelor = () => {
  const [isEdit, setIsEdit] = useState(false);

  const bachelor = useSelector((state) => {
    return state.user.user.education.bachelor;
  });

  const bachelorDetails = [
    { heading: "Marksheet", value: bachelor.marksheet },
    { heading: "Class/Year", value: bachelor.class },
    { heading: "Seat No.", value: bachelor.seatNo },
    { heading: "Semester", value: bachelor.semester },
    { heading: "Total CGPA", value: bachelor.totalCGPA },
    { heading: "Obtained CGPA", value: bachelor.obtainedCGPA },
    { heading: "Merit Position (if any)", value: bachelor.meritPosition },
  ];

  return (
    <MainSectionDiv
      heading="Bachelor Details"
      showEditIcon={true}
      setEditMode={(value) => {
        setIsEdit(value);
      }}
    >
      {isEdit ? (
        <EditBachelor setIsEdit={setIsEdit} />
      ) : (
        <Education educationName="bachelor" detailArr={bachelorDetails} />
      )}
    </MainSectionDiv>
  );
};

export default Bachelor;
