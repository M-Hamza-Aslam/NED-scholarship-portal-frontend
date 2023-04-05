import React, { useState } from "react";
import InitialDisplay from "./ScholarshipListComponents/InitialDisplay";
import ScholarshipCards from "./ScholarshipListComponents/ScholarshipCards";

import classes from "./SchlarshipList.module.css";
import { useRef } from "react";

const ScListOrigin = [
  {
    date: "5 July 2022",
    name: " Fulbright Scholarship Program Merit Badge",
    description:
      "If you want to study anywhere or in your own country and at the same time want the benefit of an international education, distance learning education is for you.  It is cheaper than actually studying abroad because everything is done online.  scholars4dev.com made a list of online degree scholarships and free online courses to help you get an online education for free.",
    status: "closed",
  },

  {
    date: "5 July 2022",
    name: "Scholarship #1",
    description:
      "Germany has become a popular destination for foreign students looking for an international education. German Universities offers internationally recognized programs at a relatively cheaper cost compared to UK, USA or Australia. Moreover, there are a significant number of available scholarships that allows foreign students to study in Germany for free.",
    status: "active",
  },

  {
    date: "5 July 2022",
    name: "Coca-Cola Scholarship",
    description:
      "The Australian Government and Australian Universities provide a large number of scholarships for international students wanting to study in Australia. scholars4dev.com lists the top Australia Scholarships for study at Australian Universities for international students",
    status: "active",
  },
  {
    date: "5 July 2022",
    name: "Scholarship #4",
    description:
      "The Government of Flanders launches a new scholarship program, Master Mind Scholarships that aims to promote the internationalization of the Flemish Higher Education.  It awards up to 35 scholarships to outstanding Master students from all countries. The incoming student is awarded a scholarship of maximum 7.500 Euro per academic year. The Flemish Host Institution can ask the applicant for a tuition fee of maximum 100 Euro per year.",
    status: "closed",
  },
  {
    date: "5 July 2022",
    name: "Scholarship #5",
    description:
      "The Science@Leuven Scholarship are for motivated and talented international students, interested in participating in an international master programme of the Faculty of Science of the K.U.Leuven. The amount of the scholarship can be up to 10,000 Euro for 1 year. The scholarship will always cover the tuition fee for 1 year, the insurance and a basic health insurance coverage. The amount awarded for living expenses can vary.",
    status: "active",
  },
  {
    date: "5 July 2022",
    name: "Scholarship #6",
    description:
      "Ghent University provides Top-up Grants to candidates from all countries on the OESO-DAC list, who wish to obtain a master’s degree at Ghent University. The scholarship consists of an allowance of 1,000 euro per month and all-in insurance.",
    status: "closed",
  },
];

const ScholarshipList = () => {
  const searchRef = useRef();
  const [status, setStatus] = useState("");
  const [scholarshipData, setScholarshipData] = useState(ScListOrigin);
  const isSearchActive = Boolean(searchRef?.current?.value || status);

  const filterByKeywordHandler = (event) => {
    setScholarshipData(
      ScListOrigin.filter((scholarship) =>
        scholarship.name
          .toLowerCase()
          .includes(event.target.value.toLowerCase().trim())
      )
    );

    setStatus("");
  };

  const filterByStatus = (event) => {
    setStatus(event.target.value);
    setScholarshipData(
      ScListOrigin.filter(
        (scholarship) => scholarship.status === event.target.value
      )
    );

    searchRef.current.value = "";
  };

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

export default ScholarshipList;
