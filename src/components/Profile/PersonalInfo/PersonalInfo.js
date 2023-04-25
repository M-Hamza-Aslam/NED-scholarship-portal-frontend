// import classes from "./PersonalInfo.module.css";
import SectionDiv from "../SectionDiv/SectionDiv";
import { useEffect, useState } from "react";
import EditPersonalInfo from "./EditPersonalInfo";
import { Fragment } from "react";
import useFetch from "../../../Hooks/UseFetch";
import { useSelector } from "react-redux";
import { BACKEND_DOMAIN } from "../../../config";

const PersonalInfo = () => {
  const { fetchData, loading } = useFetch(`${BACKEND_DOMAIN}/personal-info`);
  const [editMode, setEditMode] = useState(false);
  const token = useSelector((state) => state.user.user.token);
  const userData = useSelector((state) => {
    return {
      firstName: state.user.user.firstName,
      lastName: state.user.user.lastName,
      phoneNumber: state.user.user.phoneNumber,
      personalInfo: { ...state.user.user.personalInfo },
    };
  });
  useEffect(() => {
    const fetch = async () => {
      if (Object.keys(userData.personalInfo).length === 0) {
        const res = await fetchData(token);
      }
    };
    fetch();
  }, []);

  const infoArr = [
    { heading: "First Name", value: userData.firstName },
    { heading: "Last Name", value: userData.lastName },
    { heading: "CNIC Number", value: userData.personalInfo.cnic },
    { heading: "Class", value: userData.personalInfo.class },
    { heading: "Roll No", value: userData.personalInfo.rollNo },
    { heading: "Discipline", value: userData.personalInfo.discipline },
    { heading: "Batch", value: userData.personalInfo.batch },
    {
      heading: "Category of Admission",
      value: userData.personalInfo.categoryOfAdmission,
    },
  ];
  const contactInfoArr = [
    { heading: "Phone Number", value: userData.phoneNumber },
    {
      heading: "Alternative Phone Number",
      value: userData.personalInfo.alternativePhoneNumber,
    },
    { heading: "Email", value: userData.personalInfo.email },
  ];
  const ResidentialAddressInfoArr = [
    {
      heading: "Address",
      value: userData.personalInfo.residentialAddress,
    },
    { heading: "District", value: userData.personalInfo.residentialDistrict },
    { heading: "City", value: userData.personalInfo.residentialCity },
    { heading: "Province", value: userData.personalInfo.residentialProvince },
  ];
  const permanentAddressInfoArr = [
    {
      heading: "Address",
      value: userData.personalInfo.permanentAddress,
    },
    { heading: "District", value: userData.personalInfo.permanentDistrict },
    { heading: "City", value: userData.personalInfo.permanentCity },
    { heading: "Province", value: userData.personalInfo.permanentProvince },
  ];

  return (
    <>
      {editMode ? (
        <EditPersonalInfo setEditMode={setEditMode} />
      ) : (
        <Fragment>
          <SectionDiv
            showEditIcon={true}
            heading={"Tell Us About Yourself"}
            infoArr={infoArr}
            setEditMode={setEditMode}
            loading={loading}
          />
          <SectionDiv
            showEditIcon={false}
            heading={"Contact Details"}
            infoArr={contactInfoArr}
            loading={loading}
          />
          <SectionDiv
            showEditIcon={false}
            heading={"Residential Address"}
            infoArr={ResidentialAddressInfoArr}
            loading={loading}
          />
          <SectionDiv
            showEditIcon={false}
            heading={"Permanent Address"}
            infoArr={permanentAddressInfoArr}
            loading={loading}
          />
        </Fragment>
      )}
    </>
  );
};
export default PersonalInfo;
