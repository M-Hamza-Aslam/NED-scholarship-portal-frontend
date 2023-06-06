import React, { Fragment, useEffect, useState } from "react";
import useSWR from "swr";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getScholarshipList, globalFetcher, imgFetcher } from "../../api";
import { userActions } from "../../store/userSlice";
import InitialDisplay from "./ScholarshipDetailComponents/InitialDisplay";
import Details from "./ScholarshipDetailComponents/Details";
import { CircularProgress } from "@mui/material";
import EastIcon from "@mui/icons-material/East";
import { Button } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

import classes from "./ScholarshipDetail.module.css";
import buttonClasses from "./ScholarshipDetailComponents/ApplyForm.module.css";
import CreateScholarship from "../Admin/CreateScholarship/CreateScholarship";
import { BACKEND_DOMAIN } from "../../config";
import { toast } from "react-toastify";

const AlumniScholarshipDetail = () => {
  const navigate = useNavigate();
  const { scholarshipId } = useParams();
  const userRole = useSelector((state) => state.user.user.userRole);
  const token = useSelector((state) =>
    userRole === "admin" ? state.admin.admin.token : state.user.user.token
  );
  const [editScholarship, setEditScholarshiop] = useState(false);

  const { data, error, isLoading } = useSWR(
    [token ? `/scholarship-list/${scholarshipId}` : null, token],
    ([url, token]) => globalFetcher(url, token)
  );

  const {
    data: imgData,
    error: imgError,
    isLoading: imgLoading,
  } = useSWR(
    [token ? `/scholarshipImg/${scholarshipId}` : null, token],
    ([url, token]) => imgFetcher(url, token)
  );

  if (!data) {
    return (
      <div className="loading">
        <CircularProgress />
      </div>
    );
  }

  const scholarshipStatusChangeHandler = () => {};

  const deleteScholarshipHandler = async () => {
    const res = await fetch(
      `${BACKEND_DOMAIN}/admin/delete-scholarship?scholarshipId=${data._id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    if (res.status !== 201) {
      const resData = await res.json();
      toast.error(resData.message);
      return;
    }
    const resData = await res.json();
    toast.success(resData.message);
    navigate("/admin/scholarship-list");
  };
  console.log(data.status);
  return (
    <Fragment>
      {editScholarship ? (
        <CreateScholarship
          scholarshipData={{
            ...data,
            closeDate: data.closeDate.dateObj,
          }}
        />
      ) : (
        <div className={classes["scholarship-detail"]}>
          <InitialDisplay title="Scholarship Details" />
          <Details data={data} image={imgData} />

          <div className={buttonClasses["apply-button"]}>
            <button
              onClick={() => navigate(`/${userRole}/user-list/${data._id}`)}
              className={buttonClasses.btn}
            >
              <span className={buttonClasses["btn-text"]}>
                See User List <EastIcon sx={{ marginLeft: "5px" }} />
              </span>
            </button>
            {userRole === "admin" && (
              <div className={classes.btnDiv}>
                {data.status === "awaiting" && (
                  <Fragment>
                    <Button
                      type="button"
                      variant="contained"
                      startIcon={<DoneOutlineIcon />}
                      className={classes.submitDiv}
                      onClick={() => scholarshipStatusChangeHandler(true)}
                    >
                      Approve
                    </Button>
                    <Button
                      type="button"
                      variant="outlined"
                      startIcon={<CloseOutlinedIcon />}
                      onClick={() => scholarshipStatusChangeHandler(false)}
                      className={classes.cencelDiv}
                    >
                      Reject
                    </Button>
                  </Fragment>
                )}
                <Button
                  type="button"
                  variant="contained"
                  startIcon={<EditOutlinedIcon />}
                  className={classes.submitDiv}
                  onClick={() => setEditScholarshiop(true)}
                >
                  Edit
                </Button>
                <Button
                  type="button"
                  variant="outlined"
                  startIcon={<DeleteOutlinedIcon />}
                  onClick={deleteScholarshipHandler}
                  className={classes.cencelDiv}
                >
                  Delete
                </Button>
              </div>
            )}
          </div>
          {/* <ApplyForm data={data} canApply={canApply} /> */}
        </div>
      )}
    </Fragment>
  );
};

export default AlumniScholarshipDetail;
