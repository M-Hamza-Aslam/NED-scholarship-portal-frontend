import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useSWR from "swr";
import { globalFetcher } from "../../api";
import InitialDisplay from "./ScholarshipListComponents/InitialDisplay";
import ScholarshipCards from "./ScholarshipListComponents/ScholarshipCards";
import { CircularProgress } from "@mui/material";

import classes from "./SchlarshipList.module.css";

const AlumniScholarshipList = () => {
  const userRole = useSelector((state) => state.user.user.userRole);
  const token = useSelector((state) =>
    userRole === "admin" ? state.admin.admin.token : state.user.user.token
  );
  const { data, error, isLoading } = useSWR(
    [
      token && userRole === "alumni"
        ? "/alumni/created-scholarships"
        : token && userRole === "admin"
        ? "/admin/created-scholarship-list"
        : null,
      token,
    ],
    ([url, token]) => globalFetcher(url, token)
  );
  const [scholarshipData, setScholarshipData] = useState(data);
  const [filters, setFilters] = useState(new Map([]));
  const isSearchActive = Boolean(filters.size);

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
      <InitialDisplay
        title={userRole === "admin" ? "Alumni Scholarships" : "My Scholarships"}
        setFilters={setFilters}
      />
      {scholarshipData.length === 0 ? (
        <p className={classes.emptyMsg}>No Scholarships Found.</p>
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

export default AlumniScholarshipList;
