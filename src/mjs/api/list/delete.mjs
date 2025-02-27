
import { API_AUCTION } from "../constants.mjs";
import { prepareAuthHeaders } from "../../utilities/authUtils.mjs"; 

/**
 * Deletes an auction listing by its ID.
 * 
 * This function sends a DELETE request to the auction API to delete a specific auction.
 * It will check if the ID is provided and will throw an error if not. If the request fails, 
 * it will catch and log the error with an appropriate message. If successful, 
 * it will return a success message.
 * 
 * @param {string} id - The unique ID of the auction to be deleted.
 * @throws {Error} If the auction ID is invalid or if the API request fails.
 * @returns {Object} An object containing a success status and a message.
 */

export async function deleteAuction(id) {
  if (!id) {
    throw new Error("Invalid auction ID");
  }

  const url = `${API_AUCTION}/${id}`;
  const headers = prepareAuthHeaders(); 

  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage = errorData.message || "Failed to delete auction listing.";
      console.error(`Error ${response.status}: ${errorMessage}`);
      throw new Error(errorMessage); 
    }

    return { success: true, message: "Auction deleted successfully." };
  } catch (error) {
    console.error("Error deleting auction listing:", error);
    throw error; 
  }
}

