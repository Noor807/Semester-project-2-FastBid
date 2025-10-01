import { prepareAuthHeaders } from "../../utilities/authUtils.mjs";
import { API_AUCTION_PROFILE } from "../constants.mjs";

/**
 * Fetches the auction profile for a specific user and updates localStorage with credits.
 *
 * @param {string} user
 */
export async function fetchAuctionProfile(user) {
  if (!user) throw new Error("User identifier is required.");

  const url = `${API_AUCTION_PROFILE}/${user}`;
  const headers = prepareAuthHeaders();

  try {
    const response = await fetch(url, { method: "GET", headers });

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch {
        throw new Error(`Failed to fetch profile. Status: ${response.status}`);
      }
      const msg = errorData.message || "Failed to fetch auction profile";
      console.error(`Profile fetch error ${response.status}: ${msg}`);
      throw new Error(msg);
    }

    const data = await response.json();

    if (!data?.data?.credits && data.data.credits !== 0) {
      throw new Error("Invalid profile data: missing credits");
    }

    localStorage.setItem("credit", data.data.credits);
  } catch (error) {
    console.error("Error fetching auction profile:", error.message);
    throw error;
  }
}
