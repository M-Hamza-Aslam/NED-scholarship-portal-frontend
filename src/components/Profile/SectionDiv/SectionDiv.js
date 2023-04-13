import classes from "./SectionDiv.module.css";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

const SectionDiv = (props) => {
  const showEditIcon = props.showEditIcon;
  const infoArr = props.infoArr;
  const heading = props.heading;
  const setEditMode = props.setEditMode;
  const setEditModeHandler = () => {
    setEditMode(true);
  };
  return (
    <div className={classes.section}>
      <div className={classes.headingDiv}>
        <h2>{heading}</h2>
        {showEditIcon && (
          <button
            type="button"
            className={classes.editBtn}
            onClick={setEditModeHandler}
          >
            <EditOutlinedIcon />
          </button>
        )}
      </div>
      <hr></hr>
      <div className={classes.mainDiv}>
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
    </div>
  );
};
export default SectionDiv;
