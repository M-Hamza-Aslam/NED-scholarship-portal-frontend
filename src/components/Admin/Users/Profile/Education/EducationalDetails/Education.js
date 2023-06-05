import classes from "./Education.module.css";
import { useSelector } from "react-redux";
import { BACKEND_DOMAIN } from "../../../../../../config";
import useLoader from "../../../../../../Hooks/UseLoader";

const Education = (props) => {
  const { detailArr, educationName, userId } = props;
  const token = useSelector((state) => state.admin.admin.token);
  const { LoadingComponent, loader, handleLoader } = useLoader();

  const handleOpenMarksheet = (marksheetName) => {
    handleLoader(true);
    fetch(
      `${BACKEND_DOMAIN}/admin/marksheet?marksheetName=${marksheetName}&educationName=${educationName}&userId=${userId}`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    )
      .then((res) => res.blob())
      .then((blobData) => URL.createObjectURL(blobData))
      .then((fileUrl) => {
        handleLoader(false);
        window.open(fileUrl);
      })
      .catch((error) => {
        handleLoader(false);
        console.log(error);
      });
  };
  return (
    <div className={classes.container}>
      {loader && LoadingComponent}
      {detailArr.map((item, index) => {
        return (
          <div key={index} className={`${classes.infoDiv}`}>
            <h5>{item.heading} </h5>
            <p
              className={
                item.heading === "Marksheet" ? classes.marksheetLink : null
              }
              onClick={
                item.heading === "Marksheet"
                  ? () => handleOpenMarksheet(item.value)
                  : null
              }
            >
              {item.heading === "Marksheet" && item.value
                ? item.value.split("-")[1]
                : item.value}
            </p>
          </div>
        );
      })}
    </div>
  );
};
export default Education;
