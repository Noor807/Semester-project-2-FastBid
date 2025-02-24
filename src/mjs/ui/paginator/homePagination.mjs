/**
 * Fetches auction posts for a specific page and tag, then renders them in the DOM.
 * Updates pagination buttons based on metadata.
 *
 * @param {number} [page=1]
 * @param {string} [tag=""]
 */

import { fetchAllAuctions } from "../../api/list/allList.mjs";
import { renderAuctionPosts } from "../homeBuilder/allListing.mjs";

let currentPage = 1;
const limit = 12;

document.getElementById("categories").addEventListener("change", () => {
  document.getElementById("search-input").value = "";
  fetchPosts(1);
});

document.getElementById("search-input").addEventListener("input", () => {
  fetchPosts(1);
});

export const fetchPosts = async (page = 1) => {
  const searchQuery = document.getElementById("search-input").value.trim();
  const selectedTag = document.getElementById("categories").value;

  try {
    let response;

    if (searchQuery) {
      response = await fetchAllAuctions(12, page, searchQuery, null, true);
    } else if (selectedTag) {
      response = await fetchAllAuctions(12, page, null, selectedTag, false);
    } else {
      response = await fetchAllAuctions(12, page, null, null, false);
    }
    // Assuming you have an API function like this to fetch auction listings
    // const response = await fetchAllAuctions(limit, page, selectedTag);

    const { data, meta } = response;

    document.getElementById("auctionContainer").innerHTML = "";

    renderAuctionPosts(data);

    handlePaginationButtons(meta, page);

    currentPage = page;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const handlePaginationButtons = (meta, page) => {
  const leftButton = document.getElementById("left");
  const rightButton = document.getElementById("right");

  leftButton.disabled = page === 1 || meta.isFirstPage;
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

document.getElementById("left").addEventListener("click", goLeft);
document.getElementById("right").addEventListener("click", goRight);

window.onload = () => {
  fetchPosts(1);
};
