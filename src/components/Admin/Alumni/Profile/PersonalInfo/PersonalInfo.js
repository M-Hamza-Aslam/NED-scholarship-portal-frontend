// import classes from "./PersonalInfo.module.css";
import SectionDiv from "../SectionDiv/SectionDiv";
import { Fragment } from "react";

const PersonalInfo = (props) => {
  const { firstName, lastName, phoneNumber, personalInfo } = props.data;

  const infoArr = [
    { heading: "First Name", value: firstName },
    { heading: "Last Name", value: lastName },
    { heading: "CNIC Number", value: personalInfo.cnic },
    { heading: "Class", value: personalInfo.class },
    { heading: "Roll No", value: personalInfo.rollNo },
    { heading: "Discipline", value: personalInfo.discipline },
    { heading: "Batch", value: personalInfo.batch },
    {
      heading: "Category of Admission",
      value: personalInfo.categoryOfAdmission,
    },
  ];
  const contactInfoArr = [
    { heading: "Phone Number", value: phoneNumber },
    {
      heading: "Alternative Phone Number",
      value: personalInfo.alternativePhoneNumber,
    },
    { heading: "Email", value: personalInfo.email },
  ];
  const ResidentialAddressInfoArr = [
    {
      heading: "Address",
      value: personalInfo.residentialAddress,
    },
    { heading: "Province", value: personalInfo.residentialProvince },
    { heading: "City", value: personalInfo.residentialCity },
    { heading: "District", value: personalInfo.residentialDistrict },
  ];
  const permanentAddressInfoArr = [
    {
      heading: "Address",
      value: personalInfo.permanentAddress,
    },
    { heading: "Province", value: personalInfo.permanentProvince },
    { heading: "City", value: personalInfo.permanentCity },
    { heading: "District", value: personalInfo.permanentDistrict },
  ];

  return (
    <Fragment>
      <SectionDiv heading={"Tell Us About Yourself"} infoArr={infoArr} />
      <SectionDiv heading={"Contact Details"} infoArr={contactInfoArr} />
      <SectionDiv
        heading={"Residential Address"}
        infoArr={ResidentialAddressInfoArr}
      />
      <SectionDiv
        heading={"Permanent Address"}
        infoArr={permanentAddressInfoArr}
      />
    </Fragment>
  );
};
export default PersonalInfo;
