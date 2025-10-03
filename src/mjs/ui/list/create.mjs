import { API_AUCTION } from "../../api/constants.mjs";
import { toast } from "react-toastify";

/**
 * Constructs the URL for fetching auction listings based on search query, tag, and pagination.
 *
 * @param {number} limit - Number of items per page
 * @param {number} page - Page number
 * @param {string|null} searchQuery - Search query string
 * @param {string|null} tag - Tag filter
 * @returns {string} Fully constructed API URL
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
 * Fetches all auction listings from the API and supports pagination.
 *
 * @param {number} limit - Number of items per page
 * @param {number} page - Page number
 * @param {string|null} searchQuery - Optional search query
 * @param {string|null} tag - Optional tag filter
 * @returns {Promise<Object>} Auction listings and pagination metadata
 * @throws {Error} If the API request fails
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
      const errorMessage = `Failed to fetch auction listings. Status: ${response.status}`;
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (error) {
    toast.error("Error fetching auction listings. Please try again.");
    console.error("Error fetching auction listings:", error);
    throw error;
  }
}
