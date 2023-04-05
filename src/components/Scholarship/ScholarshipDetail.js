import React from "react";
import InitialDisplay from "./ScholarshipDetailComponents/InitialDisplay";

import classes from "./ScholarshipDetail.module.css";
import Details from "./ScholarshipDetailComponents/Details";

const ScholarshipDetail = () => {
  return (
    <div className={classes["scholarship-detail"]}>
      <InitialDisplay title="Scholarship Details" />
      <Details />
      {/* <div>
        <a href="https://www.hec.gov.pk/english/scholarshipsgrants/IDPS/Pages/default.aspx">
          HEC
        </a>
        <br />
        <a href="https://portal.ukaa-scholarships.com/dashboard-detail">UKAA</a>
      </div> */}
    </div>
  );
};

export default ScholarshipDetail;
