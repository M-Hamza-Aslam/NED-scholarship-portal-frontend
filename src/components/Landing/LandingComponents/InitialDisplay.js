import React from "react";
import { useNavigate } from "react-router-dom";
import Carousel from "react-material-ui-carousel";
import EastIcon from "@mui/icons-material/East";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import carouselImage4 from "../../../assets/images/carousel-4.jpg";
import carouselImage6 from "../../../assets/images/carousel-6.jpg";
import carouselImage7 from "../../../assets/images/carousel-7.jpg";
// import carouselImage1 from "../../../assets/images/carousel-1.jpg";
// import carouselImage2 from "../../../assets/images/carousel-2.jpg";
// import carouselImage3 from "../../../assets/images/carousel-3.jpg";
// import carouselImage5 from "../../../assets/images/carousel-5.jpg";

import classes from "./InitialDisplay.module.css";

const InitialDisplay = () => {
  const navigate = useNavigate();

  const imageHelper = {
    carousel1: carouselImage4,
    carousel2: carouselImage7,
    carousel3: carouselImage6,
  };

  const navigateToScholarshipListHandler = () => {
    navigate("/scholarship-list");
  };

  return (
    <div className={classes["initial-display"]}>
      {window.innerWidth > 600 ? (
        <Carousel autoPlay indicators={false}>
          {[1, 2, 3].map((index) => (
            <div>
              <div className={classes["carousel-image"]}>
                <img src={imageHelper[`carousel${index}`]} alt="AECP" />
              </div>
              <div className={classes["initial-text"]}>
                <h1>
                  NED SCHOLARSHIP <br /> PROGRAM
                </h1>
                <p>
                  The NED Scholarship Web Application is a user-friendly
                  platform that streamlines scholarship applications for
                  students at NED University in Pakistan. It offers a
                  centralized hub for submissions, information, and tracking.
                  This has increased accessibility to education and serves as a
                  vital resource for students seeking financial assistance.
                </p>
                <br />
                <button
                  onClick={navigateToScholarshipListHandler}
                  className={classes.btn}
                >
                  <span className={classes["btn-text"]}>
                    View Scholarship List{" "}
                    <EastIcon sx={{ marginLeft: "5px" }} />
                  </span>
                </button>
                <span className={classes["social-handles"]}>
                  <FacebookIcon />
                  <YouTubeIcon />
                </span>
              </div>
            </div>
          ))}
        </Carousel>
      ) : (
        <div>
          <div className={classes["initial-text"]}>
            <h1>NED SCHOLARSHIP PROGRAM</h1>
            <p>
              The NED Scholarship Web Application is a user-friendly platform
              that streamlines scholarship applications for students at NED
              University in Pakistan. It offers a centralized hub for
              submissions, information, and tracking. This has increased
              accessibility to education and serves as a vital resource for
              students seeking financial assistance.
            </p>
            <br />
            <button className={classes.btn}>
              <span className={classes["btn-text"]}>
                Become a Member <EastIcon sx={{ marginLeft: "5px" }} />
              </span>
            </button>
            <span className={classes["social-handles"]}>
              <FacebookIcon />
              <YouTubeIcon />
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default InitialDisplay;
