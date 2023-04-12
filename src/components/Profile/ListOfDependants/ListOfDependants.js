import classes from "./ListOfDependants.module.css";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { Button } from "@mui/material";
import Dependant from "./Dependant";
import { Fragment, useState, useEffect } from "react";
import EditDependant from "./EditDependant";
import { useSelector } from "react-redux";
import useFetch from "../../../Hooks/UseFetch";

const ListOfDependants = (props) => {
  const { fetchData } = useFetch("http://localhost:8080/dependant-details");
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
        console.log(res);
      }
    };
    fetch();
  }, [dependantDetails.hasFetched, token, fetchData]);
  const [showNewDependantForm, setShowNewDependantForm] = useState(false);
  const showNewDependantFormHandler = (value) => {
    setShowNewDependantForm(value);
  };
  const dependantDetailsArr = dependantDetails.dependantDetailsArr.map(
    (item) => {
      return [
        { heading: "Name", value: item.name },
        { heading: "Relation", value: item.relation },
        { heading: "Age", value: item.age },
        { heading: "Occupation", value: item.occupation },
      ];
    }
  );
  // const dependantsDetailArr = [
  //   [
  //     { heading: "Name", value: "Muhammad Usama" },
  //     { heading: "Relation", value: "Son" },
  //     { heading: "Age", value: "18" },
  //     { heading: "Occupation", value: "Student" },
  //   ],
  //   [
  //     { heading: "Name", value: "Muhammad Haris" },
  //     { heading: "Relation", value: "Son" },
  //     { heading: "Age", value: "15" },
  //     { heading: "Occupation", value: "Freelancer" },
  //   ],
  //   [
  //     { heading: "Name", value: "Khansa " },
  //     { heading: "Relation", value: "Daughter" },
  //     { heading: "Age", value: "12" },
  //     { heading: "Occupation", value: "Student" },
  //   ],
  // ];
  return (
    <div className={classes.section}>
      <div className={classes.headingDiv}>
        <h2>List of Dependants on Father/Guardian</h2>
      </div>
      <hr></hr>
      <div className={classes.mainDiv}>
        {showNewDependantForm ? (
          <>
            <EditDependant index={-1} setIsEdit={showNewDependantFormHandler} />
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
    </div>
  );
};
export default ListOfDependants;
