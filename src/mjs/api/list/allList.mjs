import { API_AUCTION } from "../constants.mjs";

/**
 * Constructs the URL for fetching auction listings based on search query, tag, and pagination.
 *
 * @param {number} limit - The number of items per page.
 * @param {number} page - The page number to fetch.
 * @param {string} searchQuery - The search query string.
 * @param {string} tag - The tag filter for auction listings.
 * @returns {string} The fully constructed API URL.
 */
function constructApiUrl(limit, page, searchQuery, tag) {
  const baseUrl = `${API_AUCTION}`;
  const commonParams = `limit=${limit}&page=${page}&_seller=true&_bids=true&_active=true&sort=created&sortOrder=desc`;

  if (searchQuery) {
    return `${baseUrl}/search?q=${encodeURIComponent(searchQuery)}&${commonParams}`;
  }

  if (tag) {
    return `${baseUrl}?_tag=${encodeURIComponent(tag)}&${commonParams}`;
  }

  return `${baseUrl}?${commonParams}`;
}

/**
 * Fetches all auction listings from the API with authentication and supports pagination.
 *
 * @param {number} limit - The number of items per page.
 * @param {number} page - The page number to fetch.
 * @param {string} searchQuery - The search query string (optional).
 * @param {string} tag - The tag filter for auction listings (optional).
 * @param {boolean} isSearch - Flag indicating whether it's a search query.
 * @returns {Promise<Object>} The auction listings and pagination metadata.
 * @throws {Error} If the API request fails.
 */
export async function fetchAllAuctions(
  limit = 12,
  page = 1,
  searchQuery = null,
  tag = null,
  isSearch = false
) {
  const apiUrl = constructApiUrl(limit, page, searchQuery, tag);

  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      const message = `Failed to fetch auction listings. Status: ${response.status}`;
      console.error(message);
      throw new Error(message);
    }

    const auctionData = await response.json();
    return auctionData;
  } catch (error) {
    console.error("Error fetching auction listings:", error);
    throw error;
  }
}
