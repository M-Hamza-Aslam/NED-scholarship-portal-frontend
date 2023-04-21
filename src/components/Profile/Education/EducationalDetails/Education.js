import classes from "./Education.module.css";
import { Fragment, useState } from "react";
import EditEducation from "./EditEducation";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../../../store/userSlice";
import { BACKEND_DOMAIN } from "../../../../config";
import useLoader from "../../../../Hooks/UseLoader";

const Education = (props) => {
  const { LoadingComponent, loader, handleLoader } = useLoader();

  const token = useSelector((state) => state.user.user.token);
  const dispatch = useDispatch();
  const { detailArr, index } = props;
  const [editEducation, setEditEducation] = useState(false);
  const setEditEducationHandler = (value) => {
    setEditEducation(value);
  };
  const deleteEducationHandler = async () => {
    try {
      handleLoader(true);
      const res = await fetch(`${BACKEND_DOMAIN}/delete-education`, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ index: index }),
      });
      if (res.status !== 201) {
        //here show an error through notification
        const resData = await res.json();
        console.log(resData.message);
        return;
      }
      const resData = await res.json();
      console.log("getting response:", resData);
      //here show success msg through notification
      dispatch(
        userActions.updateUserData({
          ...resData.updatedUserData,
        })
      );
      handleLoader(false);
    } catch (error) {
      console.log(error);
      handleLoader(false);
      throw new Error("education deletion failed!");
    }
  };
  return (
    <Fragment>
      {loader && LoadingComponent}
      {editEducation ? (
        <EditEducation index={index} setIsEdit={setEditEducationHandler} />
      ) : (
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
          <div className={classes.iconDiv}>
            <button type="button" onClick={() => setEditEducationHandler(true)}>
              <EditOutlinedIcon />
            </button>
            <button type="button" onClick={deleteEducationHandler}>
              <DeleteForeverOutlinedIcon />
            </button>
          </div>
        </div>
      )}
    </Fragment>
  );
};
export default Education;