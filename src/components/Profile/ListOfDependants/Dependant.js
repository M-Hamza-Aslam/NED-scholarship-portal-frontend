import { Fragment, useState } from "react";
import classes from "./Dependant.module.css";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import EditDependant from "./EditDependant";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../../../store/userSlice";
import { BACKEND_DOMAIN } from "../../../config";
import useLoader from "../../../Hooks/UseLoader";
import { toast } from "react-toastify";

const Dependant = (props) => {
  const { LoadingComponent, loader, handleLoader } = useLoader();

  const token = useSelector((state) => state.user.user.token);
  const dispatch = useDispatch();
  const { detailArr, index } = props;
  const [editDependant, setEditDependant] = useState(false);
  const setEditDependantHandler = (value) => {
    setEditDependant(value);
  };
  const deleteDependantHandler = async () => {
    try {
      handleLoader(true);
      const res = await fetch(`${BACKEND_DOMAIN}/delete-dependant`, {
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
        toast.error(resData.message);
        return;
      }
      const resData = await res.json();
      //here show success msg through notification
      dispatch(
        userActions.updateUserData({
          ...resData.updatedUserData,
        })
      );
      toast.success(resData.message);
      handleLoader(false);
    } catch (error) {
      console.log(error);
      handleLoader(false);
      toast.error("dependant deletion failed!");
      throw new Error("dependant deletion failed!");
    }
  };
  return (
    <Fragment>
      {loader && LoadingComponent}
      {editDependant ? (
        <EditDependant
          index={index}
          setIsEdit={() => setEditDependantHandler(false)}
        />
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
            <button type="button" onClick={() => setEditDependantHandler(true)}>
              <EditOutlinedIcon />
            </button>
            <button type="button" onClick={deleteDependantHandler}>
              <DeleteForeverOutlinedIcon />
            </button>
          </div>
        </div>
      )}
    </Fragment>
  );
};
export default Dependant;
