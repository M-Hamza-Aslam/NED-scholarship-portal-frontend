import React from "react";

import classes from "./Details.module.css";

const Details = ({ data, image }) => {
  return (
    <div className={classes.details}>
      <h1>{data.title}</h1>

      <div className={classes.images}>
        <img
          // src="https://www.hec.gov.pk/english/scholarshipsgrants/IDPS/PublishingImages/Pages/default/Revised_Banner%20-%2075%20National%20Top%20Talent%20Scholarship%20Program%20to%20Pakistani%20Students.jpg"
          src={image}
          alt="Scholarship Display Picture"
        />

        <div className={classes.text}>
          <div>
            <h3>Description:</h3>
            <p>{data.description}</p>
          </div>

          <div>
            <h3>Eligibility Criteria:</h3>
            <pre>{data.eligibilityCriteria}</pre>
            {/* <ol>
              <li> Only duly filled Application forms will be entertained.</li>
              <li>
                Applicants having a monthly family income equals to or less than
                Rs. 60,000/- will be eligible to apply.
              </li>
              <li>
                Failure students or who are already availing any other
                scholarship are not eligible to apply.
              </li>
              <li> Incomplete online form will not be entertained.</li>
              <li>
                Requests for amendment will not be entertained after submission
                of online application.
              </li>
            </ol> */}
          </div>

          <div>
            <h3>Instructions:</h3>
            Following documents must be uploaded at the time of submitting the
            Application.
            <pre>{data.instructions}</pre>
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
