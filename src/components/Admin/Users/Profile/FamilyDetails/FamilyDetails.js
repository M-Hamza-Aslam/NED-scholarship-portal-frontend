import SectionDiv from "../SectionDiv/SectionDiv";
import { Fragment } from "react";
const FamilyDetails = (props) => {
  const familyDetails = props.data;
  const parentDetailArr = [
    {
      heading: "Father Health Status",
      value: familyDetails.fatherHealthStatus,
    },
    {
      heading: "Father Work Status",
      value: familyDetails.fatherWorkStatus,
    },
    {
      heading: "Mother Health Status",
      value: familyDetails.motherHealthStatus,
    },
    {
      heading: "Mother Work Status",
      value: familyDetails.motherWorkStatus,
    },
  ];
  const guardianDetailArr = [
    { heading: "Name", value: familyDetails.fatherName },
    {
      heading: "Relation with Applicant",
      value: familyDetails.relationWithApplicant,
    },
    { heading: "Occupation", value: familyDetails.occupation },
    {
      heading: "Gross Salary/Income",
      value: familyDetails.grossIncome,
    },
    {
      heading: "Residential Phone Number",
      value: familyDetails.residentialPhoneNumber,
    },
    {
      heading: "Office Phone Number",
      value: familyDetails.officePhoneNumber,
    },
    {
      heading: "Monetary Assistance Amount",
      value: familyDetails.monetaryAssistanceAmount,
    },
    {
      heading: "Residential Address",
      value: familyDetails.address,
    },
    { heading: "District", value: familyDetails.district },
    { heading: "City", value: familyDetails.city },
    { heading: "Province", value: familyDetails.province },
  ];
  const familyDetailArr = [
    { heading: "No. of Earners", value: familyDetails.noOfEarners },
    {
      heading: "Total Family Income",
      value: familyDetails.totalFamilyIncome,
    },
    {
      heading: "Total No. of Dependants in words",
      value: familyDetails.totalNoOfDepandants,
    },
  ];
  return (
    <Fragment>
      <SectionDiv heading={"Parent Status"} infoArr={parentDetailArr} />
      <SectionDiv
        heading={"Father/Guardian Details"}
        infoArr={guardianDetailArr}
      />
      <SectionDiv heading={"Family Details"} infoArr={familyDetailArr} />
    </Fragment>
  );
};
export default FamilyDetails;
