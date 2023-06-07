import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { postScholarshipReport } from "../../../api";
import { useSelector } from "react-redux";

import classes from "./ScholarshipCards.module.css";

const ScholarshipCards = ({ currentItems }) => {
  const userRole = useSelector((state) => state.user.user.userRole);
  const token = useSelector((state) =>
    userRole === "admin" ? state.admin.admin.token : state.user.user.token
  );

  const viewReportHandler = async (id) => {
    const report = await postScholarshipReport(id, token);
    console.log(report);
  };

  return (
    <div className={classes["scholarship-cards"]}>
      {currentItems.map((scholarship, index) => (
        <div key={index} className={classes["scholarship-card"]}>
          <div className={classes.heading}>
            <h1>{scholarship.title}</h1>
            <div className={classes.info}>
              {/* <img src={logo} alt="Masked Logo" /> */}
              <div className={classes.date}>
                <p
                  style={{
                    // fontSize: "26px",
                    fontSize: "20px",
                  }}
                >
                  {scholarship?.closeDate?.day}th
                </p>
                <p
                  style={{
                    // fontSize: "20px",
                    fontSize: "16px",
                  }}
                >
                  {scholarship?.closeDate?.month}
                </p>
              </div>
              <hr />
              <div>
                <p className={classes.status}>
                  Status:{" "}
                  <span className={classes[scholarship.status]}>
                    {scholarship.status}
                  </span>
                </p>
              </div>
            </div>
          </div>
          <p>{scholarship.description}</p>
          <div className={classes.view}>
            <Link to={`${scholarship._id}`}>
              <span>View Details</span>
            </Link>

            {userRole === "admin" && (
              <Fragment>
                <a
                  target="_blank"
                  onClick={() => viewReportHandler(scholarship._id)}
                >
                  <span>View Report</span>
                </a>
                <Link
                  id={classes.author}
                  target="_blank"
                  to={`/admin/alumni-details/${scholarship.creator.id}`}
                >
                  Created By: <span>{scholarship.creator.name}</span>
                </Link>
              </Fragment>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

function PaginatedScholarshipCards({ items, itemsPerPage, isSearchActive }) {
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
  };

  useEffect(() => {
    setItemOffset(0);
  }, [isSearchActive]);

  return (
    <Fragment>
      <ScholarshipCards currentItems={currentItems} />
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="<"
        renderOnZeroPageCount={null}
      />
    </Fragment>
  );
}

export default PaginatedScholarshipCards;
