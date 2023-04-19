import classes from "./SectionDiv.module.css";
import MainSectionDiv from "../util/MainSectionDiv";
import LoadingDiv from "../util/LoadingDiv";

const SectionDiv = (props) => {
  const { infoArr, loading } = props;
  return (
    <MainSectionDiv
      showEditIcon={loading ? false : props.showEditIcon}
      heading={props.heading}
      setEditMode={props.setEditMode}
    >
      <div
        className={`${classes.mainDiv} ${loading && classes.loadingMainDiv}`}
      >
        {loading ? (
          <LoadingDiv />
        ) : (
          infoArr.map((info, index) => {
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
          })
        )}
      </div>
    </MainSectionDiv>
  );
};
export default SectionDiv;
