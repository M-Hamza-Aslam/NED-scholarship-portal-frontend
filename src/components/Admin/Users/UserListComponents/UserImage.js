import React, { useState, useEffect } from "react";
import { BACKEND_DOMAIN } from "../../../../config";

const UserImage = ({ userId, token }) => {
  const [imageUrl, setImageUrl] = useState(
    "https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif?20151024034921"
  );

  useEffect(() => {
    if (token) {
      fetch(`${BACKEND_DOMAIN}/admin/userProfileImg?userId=${userId}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
        .then((res) => {
          if (!res.ok) {
            return setImageUrl(
              "https://img.freepik.com/free-vector/question-mark-sign-brush-stroke-trash-style-typography-vector_53876-140880.jpg"
            );
          }
          return res.blob();
        })
        .then((blobData) => URL.createObjectURL(blobData))
        .then((imageUrl) =>
          imageUrl ? setImageUrl(imageUrl) : console.log(imageUrl)
        )
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  return (
    <img
      style={{ objectFit: "cover" }}
      src={
        imageUrl ||
        "https://img.freepik.com/free-vector/question-mark-sign-brush-stroke-trash-style-typography-vector_53876-140880.jpg"
      }
      alt={userId}
    />
  );
};

export default UserImage;
