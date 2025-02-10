import { API_AUCTION } from "../constants";

/**
 * Fetches all auction listings from the API with authentication and supports pagination.
 * 
 * @param {number} limit - The number of items per page.
 * @param {number} page - The page number to fetch.
 * @param {string} tag - The tag filter for auction listings.
 * @returns {Promise<Object>} The auction listings and pagination metadata.
 * @throws {Error} If the API request fails.
 */
export async function fetchAllAuctions(limit = 12, page = 1, tag = "") {
  try {
    // Construct the URL with pagination and optional tag filtering
   
    // Append query parameters dynamically
    const params = new URLSearchParams({
      limit: limit,   // Set the number of items per page
      page: page,     // Set the page number
      _tag: tag,         // Set the tag filter (if any)
      _seller: true,
      _bids: true,
    });
    const newUrl = `${API_AUCTION}?${params}`;
    // Append parameters to the URL
  
console.log(newUrl);

    // Make the API request
    const response = await fetch(newUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Check if the response is ok (status 200-299)
    if (!response.ok) {
      throw new Error('Failed to fetch auction listings');
    }

    // Parse the response to get the auction listings data and pagination metadata
    const auctionData = await response.json();
console.log(auctionData);

    // Return both auction data and pagination metadata
    return auctionData;

  } catch (error) {
    console.error("Error fetching auction listings:", error);
    throw error; // Re-throw error to be handled where the function is called
  }
}
