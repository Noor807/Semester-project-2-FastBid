import { API_KEY } from "../api/constants.mjs";
/**
 * Retrieves the authentication token from local storage.
 * Throws an error if the token is not found.
 *
 * @returns {string} - The authentication token.
 * @throws {Error} - If the token is missing in local storage.
 */

const KEY = API_KEY;
export function getAuthToken() {
  const adminUser = JSON.parse(localStorage.getItem("adminUser"));
  if (!adminUser || !adminUser.accessToken) {
    throw new Error("User is not authenticated. Token is missing.");
  }
  return adminUser.accessToken;
}

/**
 * Prepares the authentication headers for API requests.
 * Retrieves the authentication token and constructs headers with the token and API key.
 *
 * @returns {Object} - The headers object with the authorization token and API key.
 */

export function prepareAuthHeaders() {
  const token = getAuthToken();
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    "X-Noroff-API-Key": KEY,
  };
}
