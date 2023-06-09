import React from "react";
import Faq from "react-faq-component";

import classes from "./Faqs.module.css";

const data = {
  //   title: "FAQ (How it works)",
  rows: [
    {
      title: "What is the NED Scholarship Portal?",
      content: `The NED Scholarship Portal is an online platform dedicated to managing scholarship programs offered by NED University. It serves as a centralized system for students to apply for scholarships, track their application status, and access relevant information and resources.`,
    },
    {
      title:
        "How do I apply for a scholarship through the NED Scholarship Portal?",
      content:
        "To apply for a scholarship, you need to create an account on the NED Scholarship Portal. Once registered, you can log in and browse the available scholarship programs. Select the scholarship you're interested in and complete the application form, providing all the required details and supporting documents. Finally, submit your application through the portal before the deadline.",
    },
    {
      title:
        "What types of scholarships are available on the NED Scholarship Portal?",
      content: `The NED Scholarship Portal offers various types of scholarships, including merit-based scholarships, need-based scholarships, academic achievement scholarships, research grants, and more. The specific scholarships available may vary each academic year, so it's essential to regularly check the portal for updated information.
      `,
    },
    {
      title:
        "Who is eligible to apply for scholarships through the NED Scholarship Portal?",
      content: `Eligibility criteria for scholarships on the NED Scholarship Portal vary depending on the specific program. Generally, scholarships are open to both current and incoming students of NED University. Factors such as academic performance, financial need, field of study, and extracurricular activities may also influence eligibility for certain scholarships.`,
    },
    {
      title:
        "Can I apply for multiple scholarships through the NED Scholarship Portal?",
      content: `Yes, you can apply for multiple scholarships simultaneously through the NED Scholarship Portal. However, make sure to review each scholarship's requirements and ensure you meet the eligibility criteria before submitting multiple applications.`,
    },
    {
      title: "How will I know if my scholarship application is successful?",
      content: `After submitting your scholarship application through the NED Scholarship Portal, the selection committee will review it thoroughly. If your application is successful, you will receive a notification through the portal or via email, informing you of the award and any further steps you need to take.`,
    },
    {
      title:
        "Can I track the status of my scholarship application on the NED Scholarship Portal?",
      content: `Yes, the NED Scholarship Portal provides a tracking system that allows you to monitor the status of your scholarship application. Once logged in, you can check whether your application is under review, approved, or rejected. Additionally, you may receive updates and notifications regarding your application status through the portal.`,
    },
    {
      title:
        "What if I encounter technical issues or have questions about the NED Scholarship Portal?",
      content: `If you experience technical difficulties while using the NED Scholarship Portal, you can reach out to the portal's support team for assistance. They can provide guidance on troubleshooting common problems or address any concerns you may have. Contact details for support should be available on the portal itself.`,
    },
  ],
};

const styles = {
  rowTitleColor: "#0f2d25",
  // bgColor: 'white',
  //   rowContentColor: "grey",
  // arrowColor: "red",
};

const config = {
  // animate: true,
  // arrowIcon: "V",
  // tabFocus: true
};

const Faqs = () => {
  return (
    <div className={classes.faqs}>
      <h1 className={classes["main-heading"]}>Faqs</h1>
      <Faq data={data} styles={styles} config={config} />
    </div>
  );
};

export default Faqs;
