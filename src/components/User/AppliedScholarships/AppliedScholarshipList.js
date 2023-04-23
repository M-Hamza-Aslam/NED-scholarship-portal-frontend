import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import useSWR from "swr";
import { globalFetcher } from "../../../api";
import InitialDisplay from "./AppliedScholarshipListComponents/InitialDisplay";
import ScholarshipCards from "./AppliedScholarshipListComponents/ScholarshipCards";
import { CircularProgress } from "@mui/material";

import classes from "./AppliedScholarshipList.module.css";

const AppliedScholarshipList = () => {
  const searchRef = useRef();
  const token = useSelector((state) => state.user.user.token);
  const { data, error, isLoading } = useSWR(
    [token ? "/applied-scholarship-list" : null, token],
    ([url, token]) => globalFetcher(url, token)
  );
  const [status, setStatus] = useState("");
  const [scholarshipData, setScholarshipData] = useState(data);
  const isSearchActive = Boolean(searchRef?.current?.value || status);
  console.log(data);
  const filterByKeywordHandler = (event) => {
    setScholarshipData(
      data.filter((scholarship) =>
        scholarship.title
          .toLowerCase()
          .includes(event.target.value.toLowerCase().trim())
      )
    );

    setStatus("");
  };

  const filterByStatus = (event) => {
    setStatus(event.target.value);
    setScholarshipData(
      data.filter((scholarship) => scholarship.status === event.target.value)
    );

    searchRef.current.value = "";
  };

  useEffect(() => {
    if (data) {
      setScholarshipData(data.appliedScholarships);
    }
  }, [data]);

  if (!scholarshipData) {
    return (
      <div className="loading">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className={classes["scholarship-list"]}>
      <InitialDisplay
        title="Scholarship List"
        status={status}
        searchRef={searchRef}
        filterByStatus={filterByStatus}
        filterByKeywordHandler={filterByKeywordHandler}
      />
      <ScholarshipCards
        isSearchActive={isSearchActive}
        items={scholarshipData}
        itemsPerPage={3}
      />
    </div>
  );
};

export default AppliedScholarshipList;
