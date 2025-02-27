import { API_AUCTION } from "../constants.mjs";
import { prepareAuthHeaders } from "../auth/authUtils.mjs";

/**
 * Creates a new auction listing.
 * @param {Object} formData - The data to create the auction listing.
 * @returns {Promise<Object>} - The result of the auction listing creation.
 * @throws {Error} - If the request or the API fails.
 */
export async function createList(formData) {
  if (!formData || typeof formData !== "object") {
    throw new Error("Invalid form data provided.");
  }

  const url = API_AUCTION;
  const headers = prepareAuthHeaders();

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create auction listing.");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating auction listing:", error);
    throw new Error(`Failed to create auction listing: ${error.message}`);
  }
}
