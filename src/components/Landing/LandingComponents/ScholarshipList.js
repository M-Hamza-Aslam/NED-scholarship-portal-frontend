import React from "react";
import useSWR from "swr";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { globalFetcher } from "../../../api";
import Carousel from "react-multi-carousel";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import classes from "./ScholarshipList.module.css";
import "react-multi-carousel/lib/styles.css";

const ScholarshipList = () => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.user.token);

  const { data, error, isLoading } = useSWR(
    [`/featured-scholarship-list?qty=9`, token],
    ([url, token]) => globalFetcher(url, token)
  );

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
          {data ? (
            data.map((sc) => (
              <div className={classes["sc-card"]}>
                <div className={classes["sc-header"]}>
                  <div>
                    <p className={classes.date}>
                      {/* {new Date(sc.date).getDate()}th */}
                      {sc.closeDate.day}th
                    </p>
                    <p className={classes.month}>
                      {/* {new Date(sc.date).toLocaleString("default", {
                        month: "long",
                      })}{" "}
                      {new Date(sc.date).getFullYear()} */}
                      {sc.closeDate.month} {sc.closeDate.year}
                    </p>
                  </div>
                  <span className={classes.vl}></span>
                  <h2>{sc.title}</h2>
                </div>
                <div className={classes["sc-details"]}>
                  <p className={classes["sc-details-text"]}>
                    <span className={classes["sc-details-heading"]}>
                      Description:{" "}
                    </span>
                    <span>{sc.description}</span>
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
      <button
        onClick={() => navigate("/scholarship-list")}
        className={classes.btn}
      >
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
