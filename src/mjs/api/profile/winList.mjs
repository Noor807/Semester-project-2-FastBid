import { prepareAuthHeaders } from "../../utilities/authUtils.mjs";
import { API_AUCTION_PROFILE } from "../constants.mjs";

/**
 * Fetches the list of won auctions for the given user.
 *
 * @param {string} name - The name of the user.
 * @returns {Promise<Object>} The list of won auctions or an error.
 */
export async function fetchWinAuction(name) {
  const url = `${API_AUCTION_PROFILE}/${name}/wins?_bids=true`;

  try {
    const headers = prepareAuthHeaders();

    const response = await fetch(url, { method: "GET", headers });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch won auctions.");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching won auctions:", error);
    throw error;
  }
}
