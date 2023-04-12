// import { useEffect } from "react";
// import { useState } from "react";
import { useDispatch } from "react-redux";
import { userActions } from "../store/userSlice";

const useFetch = (url, options) => {
  const dispatch = useDispatch();
  // const [response, setResponse] = useState(null);
  // const [error, setError] = useState(null);
  // const [loading, setLoading] = useState(null);

  const fetchData = async (token = null) => {
    // setLoading(true);
    const headers = {
      "Content-Type": "application/json",
    };
    if (token) {
      headers.Authorization = "Bearer " + token;
    }
    try {
      const res = await fetch(url, {
        headers,
      });
      if (res.status !== 200) {
        const error = new Error("Data fetching failed!");
        error.status = res.status;
        throw error;
      }
      const data = await res.json();

      dispatch(
        userActions.updateUserData({
          ...data.userData,
        })
      );
      return { status: 200, data };
      // setResponse(data);
    } catch (error) {
      // setError(error);
      return error;
    }
    // setLoading(false);
  };
  // return { fetchData, response, error, loading };
  return { fetchData };
};
export default useFetch;
