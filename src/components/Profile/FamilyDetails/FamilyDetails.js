// import classes from "./FamilyDetails.module.css";
import { useEffect, useState } from "react";
import useFetch from "../../../Hooks/UseFetch";
import { useSelector } from "react-redux";

import SectionDiv from "../SectionDiv/SectionDiv";
import EditFamilyDetails from "./EditFamilyDetails";
import { Fragment } from "react";
import { BACKEND_DOMAIN } from "../../../config";
const FamilyDetails = () => {
  const { fetchData, loading } = useFetch(`${BACKEND_DOMAIN}/family-details`);
  const [editMode, setEditMode] = useState(false);
  const token = useSelector((state) => state.user.user.token);
  const userData = useSelector((state) => {
    return {
      familyDetails: { ...state.user.user.familyDetails },
    };
  });
  useEffect(() => {
    const fetch = async () => {
      if (Object.keys(userData.familyDetails).length === 0) {
        const res = await fetchData(token);
      }
    };
    fetch();
  }, []);
  const parentDetailArr = [
    {
      heading: "Father Health Status",
      value: userData.familyDetails.fatherHealthStatus,
    },
    {
      heading: "Father Work Status",
      value: userData.familyDetails.fatherWorkStatus,
    },
    {
      heading: "Mother Health Status",
      value: userData.familyDetails.motherHealthStatus,
    },
    {
      heading: "Mother Work Status",
      value: userData.familyDetails.motherWorkStatus,
    },
  ];
  const guardianDetailArr = [
    { heading: "Name", value: userData.familyDetails.fatherName },
    {
      heading: "Relation with Applicant",
      value: userData.familyDetails.relationWithApplicant,
    },
    { heading: "Occupation", value: userData.familyDetails.occupation },
    {
      heading: "Gross Salary/Income",
      value: userData.familyDetails.grossIncome,
    },
    {
      heading: "Residential Phone Number",
      value: userData.familyDetails.residentialPhoneNumber,
    },
    {
      heading: "Office Phone Number",
      value: userData.familyDetails.officePhoneNumber,
    },
    {
      heading: "Monetary Assistance Amount",
      value: userData.familyDetails.monetaryAssistanceAmount,
    },
    {
      heading: "Residential Address",
      value: userData.familyDetails.address,
    },
    { heading: "Province", value: userData.familyDetails.province },
    { heading: "City", value: userData.familyDetails.city },
    { heading: "District", value: userData.familyDetails.district },
  ];
  const familyDetailArr = [
    { heading: "No. of Earners", value: userData.familyDetails.noOfEarners },
    {
      heading: "Total Family Income",
      value: userData.familyDetails.totalFamilyIncome,
    },
    {
      heading: "Total No. of Dependants in words",
      value: userData.familyDetails.totalNoOfDepandants,
    },
  ];
  return (
    <>
      {editMode ? (
        <EditFamilyDetails setEditMode={setEditMode} />
      ) : (
        <Fragment>
          <SectionDiv
            showEditIcon={true}
            heading={"Parent Status"}
            infoArr={parentDetailArr}
            setEditMode={setEditMode}
            loading={loading}
          />
          <SectionDiv
            showEditIcon={false}
            heading={"Father/Guardian Details"}
            infoArr={guardianDetailArr}
            loading={loading}
          />
          <SectionDiv
            showEditIcon={false}
            heading={"Family Details"}
            infoArr={familyDetailArr}
            loading={loading}
          />
        </Fragment>
      )}
    </>
  );
};
export default FamilyDetails;
