import { fetchMyListings } from "../../api/profile/myList";
import { generateAuctionListing } from "../homeBuilder/profileListing";

/**
 * Fetches and displays the user's auction listings from the API and renders them in the DOM.
 *
 * @returns {Promise<void>}
 */

export async function fetchAndDisplayMyList() {
  const userdata = JSON.parse(localStorage.getItem("adminUser"));

  try {
    const data = await fetchMyListings(userdata.name);

    if (!data) {
      throw new Error("Failed to fetch listings.");
    }

    generateAuctionListing(data.data);
  } catch (error) {
    console.error("Error fetching listings:", error);
  }
}
