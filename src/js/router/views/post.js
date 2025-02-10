import { fetchSingleAuction } from "../../api/list/singleListRead";
import { setLogoutListener } from "../../ui/global/logout";
import { fetchAndRenderSingleAuction, renderSingleAuction } from "../../ui/homeBuilder/singleList";

// import { onDeletePost } from "../../ui/post/delete";

// Set up the logout listener
setLogoutListener();

// Get the post ID from the URL query parameters
const urlSearch = new URLSearchParams(window.location.search);
const postId = urlSearch.get("singleList");
fetchAndRenderSingleAuction(postId)
if (postId) {
  // Fetch the auction data using the postId
  fetchSingleAuction(postId)
    .then((auctionData) => {
      // Render the single post with the fetched data
      renderSingleAuction(auctionData.data);
    })
    .catch((error) => {
      console.error("Failed to fetch auction:", error);
    });
} else {
  console.error("Auction ID is missing in the URL.");
}

// Set up the delete button functionality
const delButton = document.querySelector(".del-btn");
if (delButton) {
  delButton.setAttribute("data-id", postId);
  delButton.addEventListener("click", onDeletePost);
}

// Set up the edit button functionality
const editButton = document.querySelector(".edit-btn");
if (editButton) {
  editButton.addEventListener("click", () => {
    window.location.href = `/post/edit/?post=${postId}`;
  });
}

// Handle the hamburger button click for navigation
const hamburgerBtn = document.getElementById("hamburger-btn");
const navbarLinks = document.getElementById("navbar-links");

hamburgerBtn.addEventListener("click", () => {
  navbarLinks.classList.toggle("hidden");
});
