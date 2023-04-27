import React, { Fragment, useEffect, useState } from "react";
import useSWR from "swr";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getScholarshipList, globalFetcher, imgFetcher } from "../../api";
import { userActions } from "../../store/userSlice";
import InitialDisplay from "./ScholarshipDetailComponents/InitialDisplay";
import Details from "./ScholarshipDetailComponents/Details";
import ApplyForm from "./ScholarshipDetailComponents/ApplyForm";
import { CircularProgress } from "@mui/material";
import EastIcon from "@mui/icons-material/East";

import classes from "./ScholarshipDetail.module.css";
import buttonClasses from "./ScholarshipDetailComponents/ApplyForm.module.css";
import CreateScholarship from "../Admin/CreateScholarship/CreateScholarship";
import { BACKEND_DOMAIN } from "../../config";
import { toast } from "react-toastify";
import { Button } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

const ScholarshipDetail = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { scholarshipId } = useParams();
  const auth = useSelector((state) => state.user.user);
  const userRole =
    location.pathname.split("/")[1] === "scholarship-list" ? "user" : "admin";
  const token = useSelector((state) => state[userRole][userRole].token);
  const [canApply, setCanApply] = useState(false);
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

  useEffect(() => {
    if (!auth?.scholarship?.hasFetched) {
      getScholarshipList(token).then(({ appliedScholarships }) => {
        appliedScholarships &&
          dispatch(
            userActions.updateUserData({
              scholarship: {
                hasFetched: true,
                scholarshipList: appliedScholarships,
              },
            })
          );
      });
    }
  }, []);

  useEffect(() => {
    const canApplyDummy = auth?.scholarship?.scholarshipList.findIndex(
      (scholarship) =>
        scholarship.scholarshipId === scholarshipId ||
        scholarship.status === "approved"
    );

    if (
      canApplyDummy === -1 &&
      auth?.scholarship?.hasFetched &&
      auth.profileStatus === 100
    ) {
      setCanApply(true);
    } else {
      setCanApply(false);
    }
  }, [auth?.scholarship]);

  if (!data) {
    return (
      <div className="loading">
        <CircularProgress />
      </div>
    );
  }

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
          {userRole === "user" ? (
            data.status.toLowerCase() === "active" && (
              <ApplyForm data={data} canApply={canApply} />
            )
          ) : (
            <div className={buttonClasses["apply-button"]}>
              <button
                onClick={() => navigate(`/admin/user-list/${data._id}`)}
                className={buttonClasses.btn}
              >
                <span className={buttonClasses["btn-text"]}>
                  See User List <EastIcon sx={{ marginLeft: "5px" }} />
                </span>
              </button>
              {/* <button onClick={() => setEditScholarshiop(true)}>
                Edit scholarship
              </button>
              <button onClick={deleteScholarshipHandler}>
                Delete scholarship
              </button> */}
              <div className={classes.btnDiv}>
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
            </div>
          )}
          {/* <ApplyForm data={data} canApply={canApply} /> */}
        </div>
      )}
    </Fragment>
  );
};

export default ScholarshipDetail;
