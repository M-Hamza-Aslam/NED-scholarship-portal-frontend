import classes from "./Education.module.css";
import { Fragment } from "react";

const Education = (props) => {
  const { detailArr } = props;
  return (
    <Fragment>
      <div className={classes.container}>
        <div className={classes.listDiv}>
          {detailArr.map((item, index) => {
            return (
              <div key={index} className={classes.itemDiv}>
                <h5>{item.heading}: </h5>
                <p>{item.value}</p>
              </div>
            );
          })}
        </div>
      </div>
    </Fragment>
  );
};
export default Education;
