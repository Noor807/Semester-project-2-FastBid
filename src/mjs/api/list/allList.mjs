import { API_AUCTION } from "../constants.mjs";

/**
 * Fetches all auction listings from the API with authentication and supports pagination.
 * 
 * @param {number} limit - The number of items per page.
 * @param {number} page - The page number to fetch.
 * @param {string} tag - The tag filter for auction listings.
 * @returns {Promise<Object>} The auction listings and pagination metadata.
 * @throws {Error} If the API request fails.
 */
export async function fetchAllAuctions(limit = 12, page = 1, searchQuery = null, tag = null, isSearch = false) {
  try {
    let newUrl;

    if (isSearch && searchQuery) {
      // Search endpoint
      newUrl = `${API_AUCTION}/search?q=${encodeURIComponent(searchQuery)}&limit=${limit}&page=${page}&_seller=true&_bids=true`;
    } else if (tag) {
      // Category filtering endpoint
      newUrl = `${API_AUCTION}?_tag=${encodeURIComponent(tag)}&limit=${limit}&page=${page}&_seller=true&_bids=true`;
    } else {
      // Default auction listings
      newUrl = `${API_AUCTION}?limit=${limit}&page=${page}&_seller=true&_bids=true`;
    }

    console.log("Fetching:", newUrl);

    const response = await fetch(newUrl, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch auction listings");
    }

    const auctionData = await response.json();
    console.log("Fetched Auctions:", auctionData);
    return auctionData;

  } catch (error) {
    console.error("Error fetching auction listings:", error);
    throw error;
  }
}