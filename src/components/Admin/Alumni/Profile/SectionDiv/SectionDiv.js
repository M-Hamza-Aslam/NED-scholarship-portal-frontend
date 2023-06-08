import classes from "./SectionDiv.module.css";
import MainSectionDiv from "../util/MainSectionDiv";

const SectionDiv = (props) => {
  const { infoArr } = props;
  return (
    <MainSectionDiv heading={props.heading}>
      <div className={`${classes.mainDiv}`}>
        {infoArr.map((info, index) => {
          return (
            <div
              key={index}
              className={`${classes.infoDiv} ${
                info.heading.includes("Address") && classes.addressField
              }`}
            >
              <h5>{info.heading}</h5>
              <p>{info.value}</p>
            </div>
          );
        })}
      </div>
    </MainSectionDiv>
  );
};
export default SectionDiv;
