import { prepareAuthHeaders } from "../../utilities/authUtils.mjs";
import { API_AUCTION } from "../constants.mjs";

/**
 * Edit an auction listing.
 *
 * @param {string} id - The ID of the auction to update.
 * @param {object} formData - The data to update the auction with.
 * @returns {object} The updated auction data.
 * @throws {Error} If the API call fails or the response is not successful.
 */
export async function editAuction(id, formData) {
  try {
    const headers = prepareAuthHeaders();

    const response = await fetch(`${API_AUCTION}/${id}`, {
      method: "PUT",
      headers: headers,
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage =
        errorData.message || "Failed to update auction listing.";
      throw new Error(errorMessage);
    }

    const data = await response.json();

    if (!data || !data.data) {
      throw new Error("Invalid response data");
    }

    return data.data;
  } catch (error) {
    console.error("Error editing auction listing:", error.message || error);
    throw error;
  }
}
