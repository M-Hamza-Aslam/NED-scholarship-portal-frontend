import { Fragment, useEffect } from "react";
// import classes from "./Education.module.css";
import EducationalDetails from "./EducationalDetails/EducationalDetails";
// import EducationalDocument from "./EducationalDocuments/EducationalDocuments";
import useFetch from "../../../Hooks/UseFetch";
import { useSelector } from "react-redux";
import { BACKEND_DOMAIN } from "../../../config";

const Education = () => {
  const { token, education } = useSelector((state) => {
    return {
      token: state.user.user.token,
      education: state.user.user.education,
    };
  });
  const { fetchData, loading } = useFetch(
    `${BACKEND_DOMAIN}/education-details`
  );
  useEffect(() => {
    const fetch = async () => {
      if (!education.hasFetched) {
        await fetchData(token);
      }
    };
    fetch();
  }, []);
  return (
    <Fragment>
      <EducationalDetails loading={loading} />
      {/* <EducationalDocument loading={loading} /> */}
    </Fragment>
  );
};
export default Education;
