import { Fragment } from "react";
import classes from "./Dependant.module.css";

const Dependant = (props) => {
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
export default Dependant;
