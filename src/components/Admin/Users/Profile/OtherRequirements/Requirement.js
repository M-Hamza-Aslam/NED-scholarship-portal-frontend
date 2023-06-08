import { Button } from "@mui/material";
import classes from "./Requirement.module.css";
import useLoader from "../../../../../Hooks/UseLoader";
import { useState } from "react";
import TransitionsModal from "./EmotionsModal";
import { BACKEND_DOMAIN } from "../../../../../config";
const Requirement = (props) => {
  const { detail } = props;
  const { LoadingComponent, loader, handleLoader } = useLoader();
  const [isShowModal, setIsShowModal] = useState(false);
  const [emotionsData, setEmotionsData] = useState({});

  const predict_Emotions = (text) => {
    handleLoader(true);
    const formData = new FormData();
    formData.append("emotion_analysis", text);
    fetch("http://localhost:5000/predict_Emotions", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setEmotionsData(data);
        setIsShowModal(true);
        handleLoader(false);
      })
      .catch((err) => {
        console.log(err);
        handleLoader(false);
      });
  };

  return (
    <div className={classes.container}>
      {loader && LoadingComponent}
      <TransitionsModal
        isShowModal={isShowModal}
        setIsShowModal={setIsShowModal}
        emotionsData={emotionsData}
      />
      <div className={classes.listDiv}>
        <div className={classes.itemDiv}>
          <h5>{detail.title}:</h5>
          <p>{detail.value}</p>
          {detail.title === "Cover Letter" &&
            BACKEND_DOMAIN === "http://localhost:8080" && (
              <Button
                type="button"
                variant="outlined"
                className={classes.btn}
                onClick={predict_Emotions}
              >
                predict Emotions
              </Button>
            )}
        </div>
      </div>
    </div>
  );
};
export default Requirement;
