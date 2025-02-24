import { API_AUCTION_PROFILE, API_KEY } from "../constants";

export async function fetchAuctionProfile(user, token) {
  try {
    const url = `${API_AUCTION_PROFILE}/${user}`;

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "X-Noroff-API-Key": API_KEY,
    };

    const response = await fetch(url, {
      method: "GET",
      headers: headers,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to delete auction listing.");
    }
    const data = await response.json();

    const { credits } = data.data;
    localStorage.setItem("credit", credits);
  } catch (error) {
    console.error("Error deleting auction listing:", error);
    throw error;
  }
}
