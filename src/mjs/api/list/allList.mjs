import { API_AUCTION } from "../constants.mjs";

/**
 * Constructs the URL for fetching auction listings based on search query, tag, and pagination.
 *
 * @param {number} limit - The number of items per page.
 * @param {number} page - The page number to fetch.
 * @param {string|null} searchQuery - The search query string.
 * @param {string|null} tag - The tag filter for auction listings.
 * @returns {string} The fully constructed API URL.
 */
function constructApiUrl(limit, page, searchQuery = null, tag = null) {
  const commonParams = new URLSearchParams({
    limit,
    page,
    _seller: "true",
    _bids: "true",
    _active: "true",
    sort: "created",
    sortOrder: "desc",
  });

  if (searchQuery) {
    return `${API_AUCTION}/search?q=${encodeURIComponent(
      searchQuery
    )}&${commonParams}`;
  }

  if (tag) {
    return `${API_AUCTION}?_tag=${encodeURIComponent(tag)}&${commonParams}`;
  }

  return `${API_AUCTION}?${commonParams}`;
}

/**
 * Fetches all auction listings from the API with authentication and supports pagination.
 *
 * @param {number} [limit=12] - The number of items per page.
 * @param {number} [page=1] - The page number to fetch.
 * @param {string|null} [searchQuery=null] - The search query string (optional).
 * @param {string|null} [tag=null] - The tag filter for auction listings (optional).
 * @returns {Promise<Object>} The auction listings and pagination metadata.
 * @throws {Error} If the API request fails.
 */
export async function fetchAllAuctions(
  limit = 12,
  page = 1,
  searchQuery = null,
  tag = null
) {
  const apiUrl = constructApiUrl(limit, page, searchQuery, tag);

  try {
    const response = await fetch(apiUrl, {
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch auction listings. Status: ${response.status}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching auction listings:", error);
    throw error;
  }
}
