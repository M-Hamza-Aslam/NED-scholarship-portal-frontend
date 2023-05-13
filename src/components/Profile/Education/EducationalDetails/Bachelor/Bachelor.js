// import classes from "./bachelor.module.css";
import MainSectionDiv from "../../../../Admin/Users/Profile/util/MainSectionDiv";
import Education from "../../../../Admin/Users/Profile/Education/EducationalDetails/Education";
import { useState } from "react";
import { useSelector } from "react-redux";
import EditBachelor from "./EditBachelor";

const Bachelor = () => {
  const [isEdit, setIsEdit] = useState(false);

  const bachelor = useSelector((state) => {
    return state.user.user.education.bachelor;
  });

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
