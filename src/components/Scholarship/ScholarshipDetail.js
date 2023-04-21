import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getScholarshipList, globalFetcher } from "../../api";
import { userActions } from "../../store/userSlice";
import InitialDisplay from "./ScholarshipDetailComponents/InitialDisplay";
import Details from "./ScholarshipDetailComponents/Details";
import ApplyForm from "./ScholarshipDetailComponents/ApplyForm";
import { CircularProgress } from "@mui/material";

import classes from "./ScholarshipDetail.module.css";

const ScholarshipDetail = () => {
  const { scholarshipId } = useParams();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.user.user);
  const [canApply, setCanApply] = useState(false);

  const { data, error, isLoading } = useSWR(
    [auth.token ? `/scholarship-list/${scholarshipId}` : null, auth.token],
    ([url, token]) => globalFetcher(url, token)
  );

  useEffect(() => {
    if (!auth?.scholarship?.hasFetched) {
      getScholarshipList(auth.token).then(({ appliedScholarships }) => {
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
    const canApply = auth.scholarship.scholarshipList.findIndex(
      (scholarship) =>
        scholarship.scholarshipId === scholarshipId ||
        scholarship.status === "approved"
    );

    if (canApply === -1 && auth?.scholarship?.hasFetched) {
      setCanApply(true);
    } else {
      setCanApply(false);
    }
  }, [auth?.scholarship?.hasFetched]);

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
      <Details data={data} />
      {/* {data.status === "active" && <ApplyForm data={data} canApply={canApply} />} */}
      <ApplyForm data={data} canApply={canApply} />
    </div>
  );
};

export default ScholarshipDetail;
