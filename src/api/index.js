const baseURL = "https://ned-scholarship-portal.onrender.com";

export const globalFetcher = (relativeURL, token) =>
  fetch(`${baseURL}${relativeURL}`, {
    headers: { Authorization: `Bearer ${token}` },
  }).then((res) => res.json());
