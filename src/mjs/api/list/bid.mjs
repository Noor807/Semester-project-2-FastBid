import { API_AUCTION } from "../constants.mjs";
import { prepareAuthHeaders } from "../../utilities/authUtils.mjs";

/**
 * Places a bid on an auction item.
 *
 * @param {string} id - The ID of the auction item.
 * @param {number} amount - The bid amount.
 * @returns {Promise<Object>} The result of the bid placement.
 * @throws {Error} If the bid request is invalid or fails.
 */
export async function placeBidApi(id, amount) {
  if (!id || !amount || amount <= 0) {
    throw new Error("Invalid parameters for bid request.");
  }

  const url = `${API_AUCTION}/${id}/bids`;
  const headers = prepareAuthHeaders();

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({ amount }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to place bid. Status: ${response.status}, Error: ${errorText}`
      );
    }

    const data = await response.json();

    return { success: true, message: "Bid placed successfully!", data };
  } catch (error) {
    console.error("Error placing bid:", error);
    return { success: false, message: error.message };
  }
}
