// import classes from "./EducationalDetails.module.css";
import Matric from "./Matric/Matric";
import Intermediate from "./Intermediate/Intermediate";
import Bachelor from "./Bachelor/Bachelor";

const EducationalDetails = (props) => {
  const { educationalDetails, userId } = props;
  return (
    <div>
      <Matric userId={userId} matric={educationalDetails.matric} />
      <Intermediate
        userId={userId}
        intermediate={educationalDetails.intermediate}
      />
      <Bachelor userId={userId} bachelor={educationalDetails.bachelor} />
    </div>
  );
};
export default EducationalDetails;
