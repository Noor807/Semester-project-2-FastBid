import { prepareAuthHeaders } from "../../utilities/authUtils.mjs";
import { API_AUCTION_PROFILE, API_KEY } from "../constants";

/**
 * Fetches the auction listings for the specified user.
 *
 * @param {string} name - The username or ID of the user to fetch listings for.
 * @returns {Promise<Object>} The listings data.
 * @throws {Error} If the API request fails or if the response is not valid.
 */
export async function fetchMyListings(name) {
  const url = `${API_AUCTION_PROFILE}/${name}/listings?_bids=true`;

  try {
    const headers = prepareAuthHeaders();

    const response = await fetch(url, { method: "GET", headers });

    if (!response.ok) {
      throw new Error(`Error fetching listings: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
