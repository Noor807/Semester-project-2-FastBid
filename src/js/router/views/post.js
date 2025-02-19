import { fetchSingleAuction } from "../../api/list/singleListRead";
import { onLogout } from "../../ui/auth/logout";
import { renderSingleAuction } from "../../ui/homeBuilder/singleList";
import { handleBidSubmission } from "../../ui/list/bid";
import { createBidHistoryModal } from "../../ui/list/bidHistory";
import { onDeletePost } from "../../ui/list/delete";
import { getHighestBidValue } from "../../utilities/higherBider";

onLogout;

//Get the post ID from the URL query parameters
const urlSearch = new URLSearchParams(window.location.search);
const postId = urlSearch.get("singleList");

// Fetch the auction data using the postId
const auctionData = await fetchSingleAuction(postId);

console.log(auctionData);
const { highestBid } = getHighestBidValue(auctionData.data);
document.getElementById("highestBid").textContent = `${highestBid}$`;
console.log(highestBid);

// Render the single post with the fetched data
renderSingleAuction(auctionData.data);

//Set up the delete button functionality
const delButton = document.querySelector(".del-btn");
if (delButton) {
  delButton.setAttribute("data-id", postId);
  delButton.addEventListener("click", onDeletePost);
}

//Set up the edit button functionality
const editButton = document.querySelector(".edit-btn");
if (editButton) {
  editButton.addEventListener("click", () => {
    window.location.href = `/post/edit/?post=${postId}`;
  });
}

const bidHistoryBtn = document.getElementById("bidHistory");
bidHistoryBtn.addEventListener(
  "click",
  createBidHistoryModal(auctionData.data.bids)
);

//Handle the hamburger button click for navigation
document.getElementById("logout-Btn").addEventListener("click", onLogout);

const hamburgerBtn = document.getElementById("hamburger-btn");
const navbarLinks = document.getElementById("navbar-links");

hamburgerBtn.addEventListener("click", () => {
  navbarLinks.classList.toggle("hidden");
});

const openBidHistory = localStorage.getItem("trigger");
if (openBidHistory === "true") {
  const bidHistoryButton = document.getElementById("bidHistory"); // Adjust the ID to match your button
  if (bidHistoryButton) {
    bidHistoryButton.click(); // Simulates a user clicking the button
  } else {
    console.warn("Bid history button not found");
  }
  localStorage.removeItem("trigger");
}

document
  .getElementById("placeBid")
  .addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent the form from reloading the page

    console.log("place-bid");

    let bidAmount = document.getElementById("bid-amount").value; // Get the bid amount from the input field
    const finalBid = parseInt(bidAmount, 10);
    let currentBalance = parseFloat(localStorage.getItem("credit")) || 0;
    // Make sure that the values are valid
    if (!postId || !finalBid) {
      console.error("Post ID or bid amount is missing");
      return;
    }

    // Log postId and highestBid for debugging purposes
    console.log("Post ID:", postId);
    console.log("Highest Bid:", highestBid);

    // Call handleBidSubmission with the postId and highestBid
    await handleBidSubmission(postId, highestBid, finalBid);
    currentBalance -= finalBid;
    localStorage.setItem("credit", currentBalance);
  });
