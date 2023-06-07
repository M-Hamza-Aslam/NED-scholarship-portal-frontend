import classes from "./CreateScholarship.module.css";
import MainSectionDiv from "../../Profile/util/MainSectionDiv";
import InitialDisplay from "./InitialDisplay";
import MeritScholarshipForm from "./MeritScholarshipForm";
import { useState } from "react";
import NeedScholarshipForm from "./NeedScholarshipForm";

const CreateScholarship = (props) => {
  const scholarshipDetails = props.scholarshipData || {};
  const isCreating = scholarshipDetails.title ? false : true;
  const [scholarshipType, setScholarshipType] = useState(
    scholarshipDetails.type || "merit"
  );
  return (
    <div className={classes.container}>
      <InitialDisplay
        title={isCreating ? "Request new scholarship" : "Update scholarship"}
        type={isCreating ? scholarshipType : null}
        typeHandler={(value) => {
          setScholarshipType(value);
        }}
      />
      {/* {loader && LoadingComponent} */}
      <div className={classes.mainDiv}>
        <MainSectionDiv
          heading={
            isCreating ? "Request new scholarship" : "Update scholarship"
          }
        >
          <div className={classes.formDiv}>
            {scholarshipType === "merit" && (
              <MeritScholarshipForm scholarshipData={scholarshipDetails} />
            )}
            {scholarshipType === "need" && (
              <NeedScholarshipForm scholarshipData={scholarshipDetails} />
            )}
          </div>
        </MainSectionDiv>
      </div>
    </div>
  );
};
export default CreateScholarship;
