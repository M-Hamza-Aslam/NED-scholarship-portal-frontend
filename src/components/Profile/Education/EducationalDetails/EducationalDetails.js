// import classes from "./EducationalDetails.module.css";
import Matric from "./Matric/Matric";
import LoadingDiv from "../../util/LoadingDiv";
import { Fragment } from "react";
import Intermediate from "./Intermediate/Intermediate";
import Bachelor from "./Bachelor/Bachelor";

const EducationalDetails = (props) => {
  const { loading } = props;
  return (
    <Fragment>
      {loading ? (
        <LoadingDiv />
      ) : (
        <div>
          <Matric />
          <Intermediate />
          <Bachelor />
        </div>
      )}
    </Fragment>
  );
};
export default EducationalDetails;
