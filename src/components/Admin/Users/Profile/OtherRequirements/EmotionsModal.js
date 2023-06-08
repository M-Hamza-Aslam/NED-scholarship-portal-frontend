import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";

import EmotionTable from "./EmotionTable";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 2,
};

export default function TransitionsModal(props) {
  const { isShowModal, setIsShowModal, emotionsData } = props;
  //   const handleOpen = () => setIsShowModal(true);
  const handleClose = () => setIsShowModal(false);

  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isShowModal}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={isShowModal}>
          <Box sx={style}>
            <EmotionTable emotionsData={emotionsData} />
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
