import { fetchSingleAuction } from "../../api/list/singleListRead";
import { setLogoutListener } from "../../ui/global/logout";
import {  renderSingleAuction } from "../../ui/homeBuilder/singleList";
import { handleBidSubmission } from "../../ui/list/bid";
import { onDeletePost } from "../../ui/list/delete";
import { getHighestBidValue } from "../../utilities/higherBider";


 //Set up the logout listener
setLogoutListener();

 //Get the post ID from the URL query parameters
const urlSearch = new URLSearchParams(window.location.search);
const postId = urlSearch.get("singleList");

 // Fetch the auction data using the postId
 const auctionData = await fetchSingleAuction(postId);
console.log(auctionData);
const highestBid = getHighestBidValue(auctionData.data)
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



 //Handle the hamburger button click for navigation
const hamburgerBtn = document.getElementById("hamburger-btn");
const navbarLinks = document.getElementById("navbar-links");

hamburgerBtn.addEventListener("click", () => {
  navbarLinks.classList.toggle("hidden");
});


document.getElementById("placeBid").addEventListener("submit", async (event) => {
  event.preventDefault(); // Prevent the form from reloading the page
  
  console.log('place-bid');
  
  let bidAmount = document.getElementById("bid-amount").value; // Get the bid amount from the input field
  bidAmount = parseFloat(3);
  // Make sure that the values are valid
  if (!postId || !bidAmount) {
    console.error('Post ID or bid amount is missing');
    return;
  }

  // Log postId and highestBid for debugging purposes
  console.log("Post ID:", postId);
  console.log("Highest Bid:", highestBid);

  // Call handleBidSubmission with the postId and highestBid
  await handleBidSubmission(postId, highestBid, bidAmount);
});




