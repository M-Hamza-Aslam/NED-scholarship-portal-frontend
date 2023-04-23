import MainSectionDiv from "../../util/MainSectionDiv";
import classes from "./EducationalDocument.module.css";
import { BACKEND_DOMAIN } from "../../../../../../config";
import useLoader from "../../../../../../Hooks/UseLoader";
import { useSelector } from "react-redux";

const EducationalDocument = (props) => {
  const { LoadingComponent, loader, handleLoader } = useLoader();
  const token = useSelector((state) => state.admin.admin.token);

  const { documents, userId } = props;

  const handleOpenDocument = (document) => {
    handleLoader(true);
    fetch(
      `${BACKEND_DOMAIN}/admin/document?documentPath=${document}&userId=${userId}`,
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
    <MainSectionDiv heading="Educational Documents">
      {loader && LoadingComponent}
      <div className={classes.mainDiv}>
        <div className={classes.filesContainer}>
          <h2>User Documents:</h2>
          <div className={classes.fileDiv}>
            {documents.map((document, index) => (
              <div key={index} className={classes.uploadedFiles}>
                <h6 onClick={() => handleOpenDocument(document)}>
                  {document.split("-")[1]}
                </h6>
                |
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainSectionDiv>
  );
};
export default EducationalDocument;
