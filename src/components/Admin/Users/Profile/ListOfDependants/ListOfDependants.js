import classes from "./ListOfDependants.module.css";
import Dependant from "./Dependant";
import { Fragment } from "react";
import MainSectionDiv from "../util/MainSectionDiv";

const ListOfDependants = (props) => {
  const dependantDetails = props.data;

  const dependantDetailsArr = dependantDetails.map((item) => {
    return [
      { heading: "Name", value: item.name },
      { heading: "Relation", value: item.relation },
      { heading: "Age", value: item.age },
      { heading: "Occupation", value: item.occupation },
    ];
  });
  return (
    <MainSectionDiv heading="List of Dependants on Father/Guardian">
      <div className={classes.mainDiv}>
        {dependantDetailsArr.map((detailArr, index) => {
          return (
            <Fragment key={index}>
              {index !== 0 && <hr />}
              <Dependant index={index} detailArr={detailArr} />
            </Fragment>
          );
        })}
      </div>
    </MainSectionDiv>
  );
};
export default ListOfDependants;
