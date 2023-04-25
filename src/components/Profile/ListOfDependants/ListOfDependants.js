import classes from "./ListOfDependants.module.css";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { Button } from "@mui/material";
import Dependant from "./Dependant";
import { Fragment, useState, useEffect } from "react";
import EditDependant from "./EditDependant";
import { useSelector } from "react-redux";
import useFetch from "../../../Hooks/UseFetch";
import MainSectionDiv from "../util/MainSectionDiv";
import { BACKEND_DOMAIN } from "../../../config";
import LoadingDiv from "../util/LoadingDiv";

const ListOfDependants = (props) => {
  const { fetchData, loading } = useFetch(
    `${BACKEND_DOMAIN}/dependant-details`
  );
  const token = useSelector((state) => state.user.user.token);
  const dependantDetails = useSelector((state) => {
    return {
      ...state.user.user.dependantDetails,
    };
  });
  useEffect(() => {
    const fetch = async () => {
      if (!dependantDetails.hasFetched) {
        const res = await fetchData(token);
      }
    };
    fetch();
  }, []);
  const [showNewDependantForm, setShowNewDependantForm] = useState(false);
  const showNewDependantFormHandler = (value) => {
    setShowNewDependantForm(value);
  };
  let dependantDetailsArr = [];
  if (dependantDetails.dependantDetailsArr) {
    dependantDetailsArr = dependantDetails.dependantDetailsArr.map((item) => {
      return [
        { heading: "Name", value: item.name },
        { heading: "Relation", value: item.relation },
        { heading: "Age", value: item.age },
        { heading: "Occupation", value: item.occupation },
      ];
    });
  }

  return (
    <MainSectionDiv heading="List of Dependants on Father/Guardian">
      {loading ? (
        <LoadingDiv />
      ) : (
        <div className={classes.mainDiv}>
          {showNewDependantForm ? (
            <>
              <EditDependant
                index={-1}
                setIsEdit={showNewDependantFormHandler}
              />
              <hr></hr>
            </>
          ) : (
            <Button
              variant="contained"
              startIcon={<AddCircleOutlineOutlinedIcon />}
              onClick={showNewDependantFormHandler}
              className={classes.addBtn}
            >
              Add Dependant
            </Button>
          )}
          {dependantDetailsArr.map((detailArr, index) => {
            return (
              <Fragment key={index}>
                {index !== 0 && <hr />}
                <Dependant index={index} detailArr={detailArr} />
              </Fragment>
            );
          })}
        </div>
      )}
    </MainSectionDiv>
  );
};
export default ListOfDependants;
