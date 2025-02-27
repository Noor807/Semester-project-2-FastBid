import { prepareAuthHeaders } from "../../utilities/authUtils.mjs";
import { API_AUCTION_PROFILE } from "../constants.mjs";

/**
 * Fetches the list of won auctions for the given user.
 *
 * @param {string} name - The name of the user to fetch the won auctions for.
 * @returns {Promise<Object>} The list of won auctions.
 * @throws {Error} If the request fails or if the response is not in the expected format.
 */
export async function fetchWinAuction(name) {
  if (!name) {
    throw new Error("User name is required to fetch won auctions.");
  }

  const url = `${API_AUCTION_PROFILE}/${name}/wins?_bids=true`;

  try {
    const headers = prepareAuthHeaders();

    const response = await fetch(url, { method: "GET", headers });

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage = errorData.message || "Failed to fetch won auctions.";
      console.error(
        `Error fetching won auctions for user "${name}": ${errorMessage}`
      );
      throw new Error(errorMessage);
    }

    const data = await response.json();

    if (!data || !data.data) {
      throw new Error("Invalid response data: Missing 'data' field.");
    }

    return data.data;
  } catch (error) {
    console.error("Error fetching won auctions:", error.message || error);
    throw error;
  }
}
