import classes from "./MainSectionDiv.module.css";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

const MainSectionDiv = (props) => {
  const showEditIcon = props.showEditIcon || false;
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
      {props.children}
    </div>
  );
};
export default MainSectionDiv;
