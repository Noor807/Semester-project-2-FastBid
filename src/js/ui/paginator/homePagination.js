/**
 * Fetches blog posts for a specific page and optional tag, then renders them in the DOM.
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

document.getElementById("categories").addEventListener("change", () => {
  fetchPosts();
});
// Fetches auction posts for a specific page and tag, then renders them in the DOM.
export const fetchPosts = async (page = 1, tag = "") => {
  try {
    const selectedTag = urlFilterHandler()
    // Assuming you have an API function like this to fetch auction listings
    const response = await fetchAllAuctions(limit, page, selectedTag); 

    // Destructure the response to get the auction data and pagination metadata
    const { data, meta } = response;

    // Clear existing posts
    document.getElementById("auctionContainer").innerHTML = "";

    // Render auction posts
    renderAuctionPosts(data);

    // Update pagination buttons based on the meta data
    handlePaginationButtons(meta);

    currentPage = page;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const handlePaginationButtons = (meta) => {
   
    const leftButton = document.getElementById("left");
    const rightButton = document.getElementById("right");
  
    leftButton.disabled = meta.isFirstPage;
    rightButton.disabled = meta.isLastPage;
  };
  

export const goLeft = () => {
  if (currentPage > 1) {
    fetchPosts(currentPage - 1);
  }
};

export const goRight = () => {
  fetchPosts(currentPage + 1);
};
