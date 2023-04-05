import React from "react";
import InitialDisplay from "./LandingComponents/InitialDisplay";
import ScholarshipList from "./LandingComponents/ScholarshipList";
import Faqs from "./LandingComponents/Faqs";
import ContactForm from "./LandingComponents/ContactForm";
import Footer from "../Navigation/Footer";

import classes from "./Landing.module.css";

const Landing = () => {
  return (
    <main className={classes.landing}>
      <InitialDisplay />
      <ScholarshipList />
      <Faqs />
      <ContactForm />
      {/* <Footer /> */}
    </main>
  );
};

export default Landing;
