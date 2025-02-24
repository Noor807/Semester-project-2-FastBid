import { API_AUCTION } from "../constants.mjs";

/**
 * Fetches a single auction post by ID from the API with authentication.
 *
 * @param {string} auctionId - The ID of the auction to fetch.
 * @returns {Promise<Object>} The auction data.
 * @throws {Error} If the token is not found or the API request fails.
 */
export async function fetchSingleAuction(auctionId) {
  try {
    const response = await fetch(
      `${API_AUCTION}/${auctionId}?_seller=true&_bids=true`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch auction with ID: ${auctionId}`);
    }

    const auctionData = await response.json();
    console.log(auctionData);

    return auctionData;
  } catch (error) {
    console.error("Error fetching single auction:", error);
    throw error;
  }
}

/**
 * 
*
  Reads multiple auctions with optional pagination and tagging.
  *
  * @param {number} [limit=12] - The maximum number of posts to return.
  * @param {number} [page=1] - The page number for pagination.
  * @param {string} [tag] - An optional tag to filter posts.
  * @returns {Promise<Object>} An object containing an array of posts in the `data` field, and information in a `meta` field.
  * @throws {Error} If the API request fails.
  */

export async function fetchAllAuctions(limit = 12, page = 1, tag) {
  const URL = `${API_AUCTION}?limit=${limit}&page=${page}&_author=true${
    tag ? `&tag=${tag}` : ""
  }`;

  try {
    const response = await fetch(URL, {
      method: "GET",
      headers: headersObject,
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error:", errorData);
      throw new Error(`Failed to fetch blog posts: ${errorData.message}`);
    }

    const { meta, data } = await response.json();
    return { meta, data };
  } catch (error) {
    console.error("Failed to fetch blog posts", error);
    throw error;
  }
}
