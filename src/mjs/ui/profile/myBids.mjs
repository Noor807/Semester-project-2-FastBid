import { fetchMyBids } from "../../api/profile/bidList";
import { generateAuctionBids } from "../homeBuilder/profileBids";

/**
 * Fetches and displays the user's bids from the API and renders them in the DOM.
 *
 * @returns {Promise<void>}
 */

export async function fetchAndDisplayMyBids() {
  const userdata = JSON.parse(localStorage.getItem("adminUser"));

  try {
    const data = await fetchMyBids(userdata.name);

    if (!data) {
      throw new Error("Failed to fetch bids.");
    }

    generateAuctionBids(data.data);
  } catch (error) {
    console.error("Error fetching bids:", error);
  }
}
