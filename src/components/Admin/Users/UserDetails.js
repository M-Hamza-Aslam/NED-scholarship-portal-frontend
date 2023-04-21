import React from "react";
import { Typography } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";

import classes from "./UserDetails.module.css";

const UserDetails = () => {
  return (
    <main className={classes["judge-details"]}>
      <div className={classes.round}>
        <img src="https://media.licdn.com/dms/image/C4D03AQHOWbtZ-BHXgA/profile-displayphoto-shrink_800_800/0/1663450693585?e=2147483647&v=beta&t=WpYhpccNv5EEgGMkTQMFTQ6TPf8vbTmEVpT2cGIa-rk" />
      </div>

      <div className={classes.text}>
        <Typography variant="h3" component="h2">
          Muhammad Jawwad
        </Typography>
        <br />
        <Typography>
          Colonel K. M. Roy is involved in dog breeding, showing and training
          since decades. He has been keeping, breeding and showing Labradors,
          German Shepherd Springer Spaniels and Pomeranians. He has trained GSDs
          and Gundogs for field work and hunting. He is judging all breed
          Championship Shows since 1983. He is an All Breed FCI Judge. He has
          judged around fifty International Shows in Nineteen Countries and in
          some countries he has judged multiple times. Currently he is the
          President of Kennel Club of Pakistan. He is master trainer for all
          GDCP dog training sessions. He is a guiding figure for the club. The
          club is trying to make best use of his experience and knowledge!
        </Typography>
        {/* <div className={classes.contact}>
          <a target="_blank" href="https://www.facebook.com/yanet.garcia.98499">
            <FacebookIcon fontSize="inherit" />
          </a>
          <a
            target="_blank"
            href="https://www.instagram.com/safridiofficial/?hl=en"
          >
            <InstagramIcon fontSize="inherit" />
          </a>
          <a
            target="_blank"
            href="https://pk.linkedin.com/in/muhammad-usman-gauhar-8b7762223"
          >
            <LinkedInIcon fontSize="inherit" />
          </a>
          <a
            target="_blank"
            href="https://twitter.com/lukeafk?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor"
          >
            <TwitterIcon fontSize="inherit" />
          </a>
        </div> */}
      </div>
    </main>
  );
};

export default UserDetails;
