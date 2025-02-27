import { prepareAuthHeaders } from "../../utilities/authUtils.mjs";
import { API_AUCTION_PROFILE, API_KEY } from "../constants";

/**
 * Fetches the auction bids for the specified user.
 *
 * @param {string} name - The username or ID of the user to fetch bids for.
 * @returns {Promise<Object>} The bids data.
 * @throws {Error} If the API request fails or if the response is not valid.
 */
export async function fetchMyBids(name) {
  const url = `${API_AUCTION_PROFILE}/${name}/bids?_listings=true`;

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
