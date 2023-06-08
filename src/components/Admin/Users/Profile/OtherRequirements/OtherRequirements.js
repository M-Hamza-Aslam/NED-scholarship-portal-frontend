import classes from "./OtherRequirements.module.css";
import MainSectionDiv from "../util/MainSectionDiv";
import { Fragment } from "react";
import Requirement from "./Requirement";

const OtherRequirements = (props) => {
  const OtherRequirements = props.data;
  // const OtherRequirements = [
  //   {
  //     title: "Cover Letter",
  //     value:
  //       "hello hello helloh elloh ellohell ohellohell ohellohellohel lohellohel lohellohell ohellohello hellohe llohe llohel lohellohe llohelloh ellohel lohelloh ellohelloh ellohello hellohell ohellohe llohelloh elloh ellohello hellohel lohelloh ellohell ohellohel lohellohe llohello hellohello hellohe llohell ohellohello hellohel lohellohellohell ohellohellohe llohellohell ohellohello hellohel lohellohell ohello helloh",
  //   },
  //   { title: "CNIC", value: "image/12332-cnic" },
  // ];

  return (
    <MainSectionDiv heading="Other Requirements">
      <div className={classes.mainDiv}>
        {OtherRequirements.map((detail, index) => {
          return (
            <Fragment key={index}>
              {index !== 0 && <hr />}
              <Requirement index={index} detail={detail} />
            </Fragment>
          );
        })}
      </div>
    </MainSectionDiv>
  );
};
export default OtherRequirements;
