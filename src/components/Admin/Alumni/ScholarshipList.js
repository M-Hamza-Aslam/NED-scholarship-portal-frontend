import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import useSWR from "swr";
import { globalFetcher } from "../../api";
import InitialDisplay from "./ScholarshipListComponents/InitialDisplay";
import ScholarshipCards from "./ScholarshipListComponents/ScholarshipCards";
import { CircularProgress } from "@mui/material";

import classes from "./SchlarshipList.module.css";
import { useLocation } from "react-router-dom";

const ScholarshipList = () => {
  // const searchRef = useRef();
  // const [status, setStatus] = useState("");
  const location = useLocation();
  const userRole = location.pathname === "/scholarship-list" ? "user" : "admin";
  const token = useSelector((state) => state[userRole][userRole].token);
  const { data, error, isLoading } = useSWR(
    [token ? "/scholarship-list" : null, token],
    ([url, token]) => globalFetcher(url, token)
  );
  const [scholarshipData, setScholarshipData] = useState(data);
  const [filters, setFilters] = useState(new Map([]));
  const isSearchActive = Boolean(filters.size);

  // const filterByKeywordHandler = (event) => {
  //   setScholarshipData(
  //     data.filter((scholarship) =>
  //       scholarship.title
  //         .toLowerCase()
  //         .includes(event.target.value.toLowerCase().trim())
  //     )
  //   );

  //   setStatus("");
  // };

  // const filterByStatus = (event) => {
  //   setStatus(event.target.value);
  //   setScholarshipData(
  //     data.filter((scholarship) => scholarship.status === event.target.value)
  //   );

  //   searchRef.current.value = "";
  // };

  useEffect(() => {
    if (data) {
      setScholarshipData(data);
    }
  }, [data]);

  useEffect(() => {
    let tempScList = data;
    filters.forEach((value, key) => {
      if (key === "title") {
        tempScList = tempScList.filter((sc) =>
          sc[key].toLowerCase().includes(value.toLowerCase().trim())
        );
        return;
      }

      tempScList = tempScList.filter((sc) => sc[key] === value);
    });
    setScholarshipData(tempScList);
  }, [filters]);

  if (!scholarshipData) {
    return (
      <div className="loading">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className={classes["scholarship-list"]}>
      <InitialDisplay title="Scholarship List" setFilters={setFilters} />
      {scholarshipData.length === 0 ? (
        <p className={classes.emptyMsg}>No scholarship Found!</p>
      ) : (
        <ScholarshipCards
          isSearchActive={isSearchActive}
          items={scholarshipData}
          itemsPerPage={10}
        />
      )}
    </div>
  );
};

export default ScholarshipList;
