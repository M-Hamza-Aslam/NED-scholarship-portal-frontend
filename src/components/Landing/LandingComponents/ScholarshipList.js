import React from "react";
// import { Link } from "react-router-dom";
import Carousel from "react-multi-carousel";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import classes from "./ScholarshipList.module.css";
import "react-multi-carousel/lib/styles.css";

const SC_LIST_DATA = [
  {
    date: "5 July 2022",
    name: "Scholarship #1",
    description:
      "Germany has become a popular destination for foreign students looking for an international education. German Universities offers internationally recognized programs at a relatively cheaper cost compared to UK, USA or Australia. Moreover, there are a significant number of available scholarships that allows foreign students to study in Germany for free.",
  },
  {
    date: "5 July 2022",
    name: " Fulbright Scholarship Program Merit Badge",
    description:
      "If you want to study anywhere or in your own country and at the same time want the benefit of an international education, distance learning education is for you.  It is cheaper than actually studying abroad because everything is done online.  scholars4dev.com made a list of online degree scholarships and free online courses to help you get an online education for free.",
  },
  {
    date: "5 July 2022",
    name: "Coca-Cola Scholarship",
    description:
      "The Australian Government and Australian Universities provide a large number of scholarships for international students wanting to study in Australia. scholars4dev.com lists the top Australia Scholarships for study at Australian Universities for international students",
  },
  {
    date: "5 July 2022",
    name: "Scholarship #4",
    description:
      "The Government of Flanders launches a new scholarship program, Master Mind Scholarships that aims to promote the internationalization of the Flemish Higher Education.  It awards up to 35 scholarships to outstanding Master students from all countries. The incoming student is awarded a scholarship of maximum 7.500 Euro per academic year. The Flemish Host Institution can ask the applicant for a tuition fee of maximum 100 Euro per year.",
  },
  {
    date: "5 July 2022",
    name: "Scholarship #5",
    description:
      "The Science@Leuven Scholarship are for motivated and talented international students, interested in participating in an international master programme of the Faculty of Science of the K.U.Leuven. The amount of the scholarship can be up to 10,000 Euro for 1 year. The scholarship will always cover the tuition fee for 1 year, the insurance and a basic health insurance coverage. The amount awarded for living expenses can vary.",
  },
  {
    date: "5 July 2022",
    name: "Scholarship #6",
    description:
      "Ghent University provides Top-up Grants to candidates from all countries on the OESO-DAC list, who wish to obtain a master’s degree at Ghent University. The scholarship consists of an allowance of 1,000 euro per month and all-in insurance.",
  },
];

const ScholarshipList = () => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  return (
    <section className={classes["scholarship-list"]}>
      <h1 className={classes["main-heading"]}>Scholarship List</h1>
      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s,
      </p>
      <div className={classes["sc-cards"]}>
        <Carousel
          customRightArrow={<CustomRightArrow />}
          customLeftArrow={<CustomLeftArrow />}
          swipeable={false}
          draggable={false}
          responsive={responsive}
          infinite={true}
          autoPlaySpeed={1000}
          keyBoardControl={true}
          transitionDuration={500}
          containerClass="carousel-container"
          itemClass="carousel-item-padding-40-px"
        >
          {SC_LIST_DATA.length > 0 ? (
            SC_LIST_DATA.map((sc) => (
              <div className={classes["sc-card"]}>
                <div className={classes["sc-header"]}>
                  <div>
                    <p className={classes.date}>
                      {new Date(sc.date).getDate()}th
                    </p>
                    <p className={classes.month}>
                      {new Date(sc.date).toLocaleString("default", {
                        month: "long",
                      })}{" "}
                      {new Date(sc.date).getFullYear()}
                    </p>
                  </div>
                  <span className={classes.vl}></span>
                  <h2>{sc.name}</h2>
                </div>
                <div className={classes["sc-details"]}>
                  <p>
                    <span className={classes["sc-details-heading"]}>
                      Description:{" "}
                    </span>
                    <span className={classes["sc-details-text"]}>
                      {sc.description}
                    </span>
                  </p>

                  {/* <p>
                    <span className={classes["sc-details-heading"]}>
                      Venue:{" "}
                    </span>
                    <span className={classes["sc-details-text"]}>
                      {sc.venue}
                    </span>
                  </p>
                  <p>
                    <span className={classes["sc-details-heading"]}>
                      Judge(s):{" "}
                    </span>
                    <span className={classes["sc-details-text"]}>
                      {sc.judge}
                    </span>
                  </p> */}
                </div>
              </div>
            ))
          ) : (
            <div className={classes["sc-card"]}>
              <div className={classes["sc-header"]}>
                <h2>NO SCHOLARSHIPS</h2>
              </div>
            </div>
          )}
        </Carousel>
      </div>
      {/* <Link to={"/scholarship-list"} style={{ textDecoration: "none" }}> */}
      <button className={classes.btn}>
        <span className={classes["btn-text"]}>
          See All Scholarships <ArrowForwardIcon sx={{ marginLeft: "5px" }} />
        </span>
      </button>
      {/* </Link> */}
    </section>
  );
};

export default ScholarshipList;

export const CustomRightArrow = ({ onClick, ...rest }) => {
  const {
    onMove,
    carouselState: { currentSlide, deviceType },
  } = rest;

  return (
    <div className={classes["custom-arrow"]} onClick={() => onClick()}>
      <ArrowForwardIcon />
    </div>
  );
};

export const CustomLeftArrow = ({ onClick, ...rest }) => {
  const {
    onMove,
    carouselState: { currentSlide, deviceType },
  } = rest;

  return (
    <div
      style={{
        right: "40px",
      }}
      className={classes["custom-arrow"]}
      onClick={() => onClick()}
    >
      <ArrowBackIcon />
    </div>
  );
};
