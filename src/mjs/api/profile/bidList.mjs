import { prepareAuthHeaders } from "../../utilities/authUtils.mjs";
import { API_AUCTION_PROFILE } from "../constants";

/**
 * Fetches the auction bids for the specified user.
 *
 * @param {string} name - The username or ID of the user to fetch bids for.
 * @returns {Promise<Object>} The bids data.
 * @throws {Error} If the API request fails or if the response is not valid.
 */
export async function fetchMyBids(name) {
  if (!name) {
    throw new Error("The 'name' parameter is required.");
  }

  const url = `${API_AUCTION_PROFILE}/${name}/bids?_listings=true`;

  try {
    const headers = prepareAuthHeaders();

    const response = await fetch(url, { method: "GET", headers });

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage =
        errorData.message || `Error fetching bids: ${response.statusText}`;
      console.error(`Error ${response.status}: ${errorMessage}`);
      throw new Error(errorMessage);
    }

    const data = await response.json();
    if (!data || !data.data) {
      throw new Error(
        "Invalid response data. No 'data' field in the response."
      );
    }

    return data;
  } catch (error) {
    console.error("Error fetching auction bids:", error.message || error);
    throw error;
  }
}
