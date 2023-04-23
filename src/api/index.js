const baseURL = "https://ned-scholarship-portal.onrender.com";

const getHeaders = (token) => ({
  Authorization: `Bearer ${token}`,
  "Content-Type": "application/json",
});

export const globalFetcher = (relativeURL, token) =>
  fetch(`${baseURL}${relativeURL}`, {
    headers: getHeaders(token),
  }).then((res) => res.json());

export const imgFetcher = (relativeURL, token) =>
  fetch(`${baseURL}${relativeURL}`, {
    headers: getHeaders(token),
  })
    .then((res) => res.blob())
    .then((blobData) => URL.createObjectURL(blobData));

export const postApplyScholarship = async (scholarshipId, token) => {
  const body = JSON.stringify({ scholarshipId });
  const response = await fetch(`${baseURL}/apply-scholarship`, {
    method: "POST",
    headers: getHeaders(token),
    body,
  });
  const responseData = await response.json();
  if (response.ok) return responseData;
};

export const getScholarshipList = async (token) => {
  const response = await fetch(`${baseURL}/applied-scholarship-list`, {
    headers: getHeaders(token),
  });

  const responseData = await response.json();
  return responseData;
};
