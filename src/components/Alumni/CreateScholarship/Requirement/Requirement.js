import classes from "./Requirement.module.css";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Fragment, useState } from "react";
import EditRequirement from "./EditRequirement";

const Requirement = (props) => {
  const { reqDetail, index, updateRequirements, setIsSubmit } = props;
  const [isEditReqForm, setIsEditReqForm] = useState(false);

  const HandleReqDelete = (index) => {
    updateRequirements((requirements) => {
      requirements.splice(index, 1);
      return [...requirements];
    });
  };
  return (
    <Fragment>
      {isEditReqForm ? (
        <EditRequirement
          index={index}
          setIsEdit={() => {
            setIsEditReqForm(false);
            setIsSubmit(true);
          }}
          reqDetail={reqDetail}
          updateRequirements={updateRequirements}
        />
      ) : (
        <div className={classes.container}>
          <div className={classes.listDiv}>
            <div className={classes.itemDiv}>
              <h5>Label: </h5>
              <p>{reqDetail.label}</p>
            </div>
            <div className={classes.itemDiv}>
              <h5>Type: </h5>
              <p>{reqDetail.type}</p>
            </div>
            <div className={classes.itemDiv}>
              <h5>Validation: </h5>
              <p>{reqDetail.validation}</p>
            </div>
            <div className={classes.itemDiv}>
              <h5>Required: </h5>
              <p>{reqDetail.required.toString()}</p>
            </div>
          </div>
          <div className={classes.iconDiv}>
            <button
              type="button"
              onClick={() => {
                setIsEditReqForm(true);
                setIsSubmit(false);
              }}
            >
              <EditOutlinedIcon />
            </button>
            <button type="button" onClick={HandleReqDelete}>
              <DeleteForeverOutlinedIcon />
            </button>
          </div>
        </div>
      )}
    </Fragment>
  );
};
export default Requirement;
