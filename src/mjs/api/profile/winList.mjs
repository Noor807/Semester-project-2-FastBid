import { API_AUCTION_PROFILE, API_KEY } from "../constants";

export async function fetchWinAuction(name) {
  const url = `${API_AUCTION_PROFILE}/${name}/wins?_bids=true`;
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    "X-Noroff-API-Key": API_KEY,
  };

  try {
    const response = await fetch(url, { method: "GET", headers });

    if (!response.ok) {
      throw new Error(`Error fetching listings: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
