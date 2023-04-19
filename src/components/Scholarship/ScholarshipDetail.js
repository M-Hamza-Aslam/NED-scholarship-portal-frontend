import React from "react";
import useSWR from "swr";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { globalFetcher } from "../../api";
import InitialDisplay from "./ScholarshipDetailComponents/InitialDisplay";
import Details from "./ScholarshipDetailComponents/Details";
import ApplyForm from "./ScholarshipDetailComponents/ApplyForm";
import { CircularProgress } from "@mui/material";

import classes from "./ScholarshipDetail.module.css";

const ScholarshipDetail = () => {
  const token = useSelector((state) => state.user.user.token);
  const { scholarshipId } = useParams();

  const { data, error, isLoading } = useSWR(
    [token ? `/scholarship-list/${scholarshipId}` : null, token],
    ([url, token]) => globalFetcher(url, token)
  );

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
      <ApplyForm data={data} />
    </div>
  );
};

export default ScholarshipDetail;
