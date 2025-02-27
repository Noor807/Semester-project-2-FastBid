import { prepareAuthHeaders } from "../../utilities/authUtils.mjs";
import { API_AUCTION_PROFILE } from "../constants";

/**
 * Fetches the auction profile for a specific user and updates localStorage with the user's credits.
 *
 * @param {string} user - The user's unique identifier (e.g., username or user ID).
 * @returns {Promise<void>} Resolves when the profile is successfully fetched and updated.
 * @throws {Error} If the fetch fails or if the profile data is malformed.
 */
export async function fetchAuctionProfile(user) {
  if (!user) {
    throw new Error("User identifier is required.");
  }

  const url = `${API_AUCTION_PROFILE}/${user}`;
  const headers = prepareAuthHeaders();

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: headers,
    });

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage =
        errorData.message || "Failed to fetch auction profile.";
      console.error(`Error ${response.status}: ${errorMessage}`);
      throw new Error(errorMessage);
    }

    const data = await response.json();

    if (!data || !data.data || typeof data.data.credits === "undefined") {
      throw new Error(
        "Invalid profile data received. Missing or malformed credits field."
      );
    }

    const { credits } = data.data;

    localStorage.setItem("credit", credits);
  } catch (error) {
    console.error("Error fetching auction profile:", error.message || error);
    throw error;
  }
}
