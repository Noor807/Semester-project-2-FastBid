/**
 * Fetches and displays the user's winning auction data from the API and renders them in the DOM.
 *
 * @returns {Promise<void>}
 */

import { fetchWinAuction } from "../../api/profile/winList";
import { generateWinningAuctions } from "../homeBuilder/profileWinList";

export async function fetchAndDisplayMyWins() {
  const userdata = JSON.parse(localStorage.getItem("adminUser"));

  try {
    const data = await fetchWinAuction(userdata.name);

    if (!data) {
      throw new Error("Failed to fetch winning auctions.");
    }

    generateWinningAuctions(data.data);
  } catch (error) {
    console.error("Error fetching winning auctions:", error);
  }
}
