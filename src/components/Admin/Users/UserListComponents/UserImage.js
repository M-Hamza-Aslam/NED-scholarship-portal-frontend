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
        .then((res) => res.blob())
        .then((blobData) => URL.createObjectURL(blobData))
        .then((imageUrl) => setImageUrl(imageUrl))
        .catch((error) => console.log(error));
    }
  }, []);

  return <img style={{ objectFit: "cover" }} src={imageUrl} alt={userId} />;
};

export default UserImage;
