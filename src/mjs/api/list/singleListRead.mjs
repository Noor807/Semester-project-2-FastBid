import { API_AUCTION } from "../constants.mjs";

/**
 * Fetches a single auction post by ID from the API.
 *
 * @param {string} auctionId - The ID of the auction to fetch.
 * @returns {Promise<Object>} The auction data.
 * @throws {Error} If the API request fails.
 */
export async function fetchSingleAuction(auctionId) {
  if (!auctionId) {
    throw new Error("Auction ID is required.");
  }

  const url = `${API_AUCTION}/${auctionId}?_seller=true&_bids=true`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || `Failed to fetch auction with ID: ${auctionId}`
      );
    }

    const auctionData = await response.json();
    return auctionData;
  } catch (error) {
    console.error("Error fetching single auction:", error);
    throw error;
  }
}

/**
 * Fetches multiple auction posts with optional pagination and tagging.
 *
 * @param {number} [limit=12] - The maximum number of posts to return.
 * @param {number} [page=1] - The page number for pagination.
 * @param {string} [tag] - An optional tag to filter posts.
 * @returns {Promise<Object>} An object containing an array of posts in the `data` field, and information in a `meta` field.
 * @throws {Error} If the API request fails.
 */
export async function fetchAllAuctions(limit = 12, page = 1, tag) {
  const urlParams = new URLSearchParams({
    limit: limit.toString(),
    page: page.toString(),
    _author: "true",
  });

  if (tag) {
    urlParams.append("tag", tag);
  }

  const url = `${API_AUCTION}?${urlParams.toString()}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Failed to fetch auctions.`);
    }

    const { meta, data } = await response.json();
    return { meta, data };
  } catch (error) {
    console.error("Error fetching auctions:", error);
    throw error;
  }
}
