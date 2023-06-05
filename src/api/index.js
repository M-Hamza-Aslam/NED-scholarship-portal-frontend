import { BACKEND_DOMAIN } from "../config";
const baseURL = BACKEND_DOMAIN;

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

export const postApplyScholarship = async (
  scholarshipId,
  token,
  additionalReqs
) => {
  const body = JSON.stringify({ scholarshipId, additionalReqs });
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

export const postChangeUserStatus = async (
  userId,
  scholarshipId,
  updatedStatus,
  token
) => {
  const body = JSON.stringify({ userId, scholarshipId, updatedStatus });
  const response = await fetch(`${baseURL}/admin/update-scholarship-status`, {
    method: "POST",
    headers: getHeaders(token),
    body,
  });

  return response;
};

export const postScholarshipReport = async (id, token) => {
  const body = JSON.stringify({ id });
  const response = await fetch(`${baseURL}/scholarship-report`, {
    method: "POST",
    headers: getHeaders(token),
    body,
  });

  const responseData = await response.json();
  if (response.ok) return responseData;
};
