import React from "react";

import classes from "./Details.module.css";

const Details = ({ data, image }) => {
  return (
    <div className={classes.details}>
      <h1>
        {data.title} ({data.type})
      </h1>

      <div className={classes.images}>
        <img
          // src="https://www.hec.gov.pk/english/scholarshipsgrants/IDPS/PublishingImages/Pages/default/Revised_Banner%20-%2075%20National%20Top%20Talent%20Scholarship%20Program%20to%20Pakistani%20Students.jpg"
          src={image}
          alt="Scholarship Display Picture"
        />

        <div className={classes.text}>
          <div>
            <h3>Description:</h3>
            <pre className={classes.preText}>{data.description}</pre>
          </div>

          <div>
            <h3>Eligibility Criteria:</h3>
            <pre className={classes.preText}>{data.eligibilityCriteria}</pre>
            <div className={classes["minimum-reqs"]}>
              <h4>Other Requirements: </h4>
              {data.type === "merit" ? (
                <ul>
                  <li>Minimum CGPA Required: {data?.bachelorCGPA || "-"}</li>
                  <li>
                    Minimum Intermediate Percentage Required:{" "}
                    {data?.intermediatePercentage || "-"}
                  </li>
                  <li>
                    Minimum Matric Percentage Required:{" "}
                    {data?.matricPercentage || "-"}
                  </li>
                </ul>
              ) : (
                <ul>
                  <li>
                    Maximum Family Income (per person) Allowed:{" "}
                    {data?.familyIncome || "-"}
                  </li>
                </ul>
              )}
            </div>
          </div>

          <div>
            <h3>Instructions:</h3>
            <pre className={classes.preText}>{data.instructions}</pre>
            {/* <ol>
            <li> Photograph of Applicant.</li>
            <li> Copy of Applicant CNIC.</li>
            <li> Copy of ID Card of Institute/ College/ University.</li>
            <li>
              Copy of All marks sheets/transcript from Matric to onward.
            </li>
            <li>
              Salary Slip / Income Certificate of Father’s/ Guardian’s income
              (attested by BPS-17 or above, College/University Teacher).
            </li>
            <li>
              Undertaking provided by UKAA scholarship selection committee
              (attested by BPS-17 or above, College/University Teacher).
            </li>
            <li>
              In case of RENEW applicants, proof of last UKAA Scholarship
              awarding letter.
            </li>
          </ol> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
