/**
 * Fetches auction posts for a specific page and tag, then renders them in the DOM.
 * Updates pagination buttons based on metadata.
 *
 * @param {number} [page=1] - The page number to fetch.
 * @param {string} [tag=""] - Optional tag filter for the posts.
 */

// Import functions to fetch auction posts and render them
import { fetchAllAuctions } from "../../api/list/allList";  // API function for fetching auction posts
import { urlFilterHandler } from "../../utilities/urlFilterHandler";
import { renderAuctionPosts } from "../homeBuilder/allListing";  // Function to render auction posts in DOM

let currentPage = 1;
const limit = 12;

// Handle category change event
document.getElementById("categories").addEventListener("change", () => {
  document.getElementById("search-input").value = ''
  fetchPosts(1); // Fetch posts when category is changed (reset to page 1)
});

document.getElementById("search-input").addEventListener("input", () => {
  fetchPosts(1); // Fetch posts when category is changed (reset to page 1)
});


// Fetches auction posts for a specific page and tag, then renders them in the DOM.
export const fetchPosts = async (page = 1) => {
  const searchQuery = document.getElementById("search-input").value.trim();
  const selectedTag = urlFilterHandler() || ""; // Get selected category

  try {
    let response;

    if (searchQuery) {
      // Call search endpoint
      response = await fetchAllAuctions(12, page, searchQuery, null, true);
    } else if (selectedTag) {
      // Call category endpoint
      response = await fetchAllAuctions(12, page, null, selectedTag, false);
    } else {
      // Fetch all auctions normally
      response = await fetchAllAuctions(12, page, null, null, false);
    }
    // Assuming you have an API function like this to fetch auction listings
   // const response = await fetchAllAuctions(limit, page, selectedTag);

    // Destructure the response to get the auction data and pagination metadata
    const { data, meta } = response;

    // Clear existing posts
    document.getElementById("auctionContainer").innerHTML = "";

    // Render auction posts
    renderAuctionPosts(data);

    // Update pagination buttons based on the meta data
    handlePaginationButtons(meta, page);

    // Update the current page
    currentPage = page;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// Update pagination buttons based on the meta data (e.g., first and last page flags)
const handlePaginationButtons = (meta, page) => {
  const leftButton = document.getElementById("left");
  const rightButton = document.getElementById("right");

  // Disable buttons based on current page and meta data
  leftButton.disabled = page === 1 || meta.isFirstPage;
  rightButton.disabled = meta.isLastPage;
};

// Move to the previous page
export const goLeft = () => {
  if (currentPage > 1) {
    fetchPosts(currentPage - 1); // Fetch the previous page
  }
};

// Move to the next page
export const goRight = () => {
  fetchPosts(currentPage + 1); // Fetch the next page
};

// Ensure event listeners for pagination buttons are added on page load
document.getElementById("left").addEventListener("click", goLeft);
document.getElementById("right").addEventListener("click", goRight);

// Initial fetch when page loads (with no filter by default)
window.onload = () => {
  fetchPosts(1); // Load the first page when no category is selected
};
