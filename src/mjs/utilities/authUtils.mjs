
import { API_KEY } from "../api/constants.mjs";


export function getAuthToken() {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("User is not authenticated. Token is missing.");
  }
  return token;
}


export function prepareAuthHeaders() {
  const token = getAuthToken();
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    "X-Noroff-API-Key": API_KEY, 
  };
}
