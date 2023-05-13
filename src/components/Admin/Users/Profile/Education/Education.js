import { Fragment } from "react";
// import classes from "./Education.module.css";
import EducationalDetails from "./EducationalDetails/EducationalDetails";
// import EducationalDocument from "./EducationalDocuments/EducationalDocuments";

const Education = (props) => {
  const educationalDetails = props.data;
  const userId = props.userId;
  return (
    <Fragment>
      <EducationalDetails
        userId={userId}
        educationalDetails={educationalDetails}
      />
      {/* <EducationalDocument documents={documents} userId={userId} /> */}
    </Fragment>
  );
};
export default Education;
