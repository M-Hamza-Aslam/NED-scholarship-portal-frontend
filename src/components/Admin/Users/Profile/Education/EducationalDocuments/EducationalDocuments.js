import MainSectionDiv from "../../util/MainSectionDiv";
import NoteAddOutlinedIcon from "@mui/icons-material/NoteAddOutlined";
import classes from "./EducationalDocument.module.css";
import { useState } from "react";
import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../../../store/userSlice";
import { BACKEND_DOMAIN } from "../../../../config";
import LoadingDiv from "../../util/LoadingDiv";
import useLoader from "../../../../Hooks/UseLoader";

const EducationalDocument = (props) => {
  const { LoadingComponent, loader, handleLoader } = useLoader();

  const { loading } = props;
  const [files, setFiles] = useState([]);

  const dispatch = useDispatch();

  const { token, documents } = useSelector((state) => {
    return {
      token: state.user.user.token,
      documents: state.user.user.education.documents,
    };
  });

  const handleFileInputChange = (event) => {
    const selectedFiles = event.target.files;
    const newFiles = [...files];
    for (let i = 0; i < selectedFiles.length; i++) {
      const fileName = selectedFiles[i].name;
      const isDuplicate = newFiles.some((file) => file.name === fileName);
      if (!isDuplicate) {
        newFiles.push(selectedFiles[i]);
      }
    }
    setFiles(newFiles);
  };

  const handleRemoveFile = (fileIndex) => {
    const newFiles = [...files];
    newFiles.splice(fileIndex, 1);
    setFiles(newFiles);
  };

  const handleOpenFile = (file) => {
    const fileURL = URL.createObjectURL(file);
    window.open(fileURL, "_blank");
  };

  const handleOpenDocument = (document) => {
    handleLoader(true);
    fetch(`${BACKEND_DOMAIN}/document?documentPath=${document}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
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

  const handleRemoveDocument = async (document) => {
    try {
      handleLoader(true);
      const res = await fetch(
        `${BACKEND_DOMAIN}/document?documentPath=${document}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
          method: "DELETE",
        }
      );
      if (res.status !== 201) {
        //here show an error through notification
        const resData = await res.json();
        console.log(resData.message);
        return;
      }
      const resData = await res.json();
      //here show success msg through notification
      dispatch(
        userActions.updateUserData({
          ...resData.updatedUserData,
        })
      );
      handleLoader(false);
    } catch (err) {
      handleLoader(false);
      console.log(err);
    }
  };

  const submiitFilesHandler = async () => {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }
    try {
      handleLoader(true);
      const res = await fetch(`${BACKEND_DOMAIN}/upload-documents`, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
        },
        body: formData,
      });
      if (res.status !== 201) {
        //here show an error through notification
        const resData = await res.json();
        console.log(resData.message);
        return;
      }
      const resData = await res.json();
      //here show success msg through notification
      dispatch(
        userActions.updateUserData({
          ...resData.updatedUserData,
        })
      );
      handleLoader(false);
      //resetting input
      setFiles([]);
    } catch (error) {
      console.error(error);
      handleLoader(false);
    }
  };

  return (
    <MainSectionDiv heading="Educational Documents">
      {loader && LoadingComponent}
      {loading ? (
        <LoadingDiv />
      ) : (
        <div className={classes.mainDiv}>
          <div className={classes.instructionDiv}>
            <p>
              PHOTOCOPIES OF THE FOLLOWING DOCUMENTS TO BE ATTACHED:
              <br />
              a) Mark Certificate(s) of all engineering examinations / S.S.C. &
              H.Sc / B.Sc. marks certificate for students of first year
              engineering.
              <br />
              b) (i) Salary certificate of father / guardian, if employed. (ii)
              Updated Pension Book of father / guardian, if retired. (iii) In
              case of father /guardian has business an affidavit of income
              verification id origina.
              <br />
              c) National LD. Card /'B" Form of all dependants.
              <br />
              d) University Identity Card.
              <br />
              Note:
              <br />
              i) Photocopies submitted along with the application must be
              attested by Officer of Grade 17 or above / Councilor / Nazim of
              the concerned Union Council.
              <br />
              ii) The University is authorized to demand any document whenever
              required.
            </p>
          </div>
          <div className={classes.filesContainer}>
            <h2>Uploaded Files:</h2>
            <div className={classes.fileDiv}>
              {documents.map((document, index) => (
                <div key={index} className={classes.uploadedFiles}>
                  <h6 onClick={() => handleOpenDocument(document)}>
                    {document.split("-")[1]}
                  </h6>
                  <button onClick={() => handleRemoveDocument(document)}>
                    Remove
                  </button>
                  |
                </div>
              ))}
            </div>
          </div>
          <div className={classes.container}>
            <div className={classes.leftDiv}>
              <h2>Upload Documents</h2>
              <p>File types: PDF, DOCX</p>
              <Button
                variant="contained"
                disabled={files.length === 0}
                endIcon={<SendIcon />}
                onClick={submiitFilesHandler}
                className={classes.sendBtn}
              >
                Save Files
              </Button>
            </div>
            <div
              className={classes.rightDiv}
              onClick={() => {
                document.getElementById("documentsUpload").click();
              }}
            >
              <input
                type="file"
                id="documentsUpload"
                accept=".pdf, .docx"
                onChange={handleFileInputChange}
                hidden
                multiple
              />
              <NoteAddOutlinedIcon />
              <p>upload new file</p>
            </div>
          </div>
          <div className={classes.fileDiv}>
            {files.map((file, index) => (
              <div key={index} className={classes.uploadedFiles}>
                <h6 onClick={() => handleOpenFile(file)}>{file.name}</h6>
                <button onClick={() => handleRemoveFile(index)}>Remove</button>|
              </div>
            ))}
          </div>
        </div>
      )}
    </MainSectionDiv>
  );
};
export default EducationalDocument;
