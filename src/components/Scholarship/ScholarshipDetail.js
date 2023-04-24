import React, { useEffect, useState } from "react";
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
    const canApply = auth?.scholarship?.scholarshipList.findIndex(
      (scholarship) =>
        scholarship.scholarshipId === scholarshipId ||
        scholarship.status === "approved"
    );

    if (canApply === -1 && auth?.scholarship?.hasFetched) {
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

  return (
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
        </div>
      )}
      {/* <ApplyForm data={data} canApply={canApply} /> */}
    </div>
  );
};

export default ScholarshipDetail;
