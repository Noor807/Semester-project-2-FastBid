import { fetchSingleAuction } from "../../api/list/singleListRead.mjs";
import { updateAdminButton } from "../../ui/global/loginAdmin.mjs";
import { renderSingleAuction } from "../../ui/homeBuilder/singleList.mjs";
import { handleBidSubmission } from "../../ui/list/bid.mjs";
import { createBidHistoryModal } from "../../ui/list/bidHistory.mjs";
import { onDeletePost } from "../../ui/list/delete.mjs";
import { getHighestBidValue } from "../../utilities/higherBider.mjs";
import { toastMessage } from "../../utilities/toastMsg.mjs";
updateAdminButton();

const urlSearch = new URLSearchParams(window.location.search);
const postId = urlSearch.get("singleList");

const auctionData = await fetchSingleAuction(postId);

async function hidden(data) {
  const userData = JSON.parse(localStorage.getItem("adminUser"));
  if (!userData) return;

  const adminAction = document.getElementById("adminAction");
  if (userData.name !== data.seller.name) {
    adminAction.classList.add("hidden");
  } else {
    adminAction.classList.remove("hidden");
    adminAction.classList.add("flex");
  }
}
hidden(auctionData.data);

console.log(auctionData);
const { highestBid } = getHighestBidValue(auctionData.data);
document.getElementById("highestBid").textContent = `${highestBid}$`;
console.log(highestBid);

renderSingleAuction(auctionData.data);

const delButton = document.querySelector(".del-btn");
if (delButton) {
  delButton.setAttribute("data-id", postId);
  delButton.addEventListener("click", onDeletePost);
}

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

const hamburgerBtn = document.getElementById("hamburger-btn");
const navbarLinks = document.getElementById("navbar-links");

hamburgerBtn.addEventListener("click", () => {
  navbarLinks.classList.toggle("hidden");
});

const openBidHistory = localStorage.getItem("trigger");
if (openBidHistory === "true") {
  const bidHistoryButton = document.getElementById("bidHistory");
  if (bidHistoryButton) {
    bidHistoryButton.click();
  } else {
    console.warn("Bid history button not found");
  }
  localStorage.removeItem("trigger");
}

document
  .getElementById("placeBid")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    console.log("place-bid");

    let bidAmount = document.getElementById("bid-amount").value;
    const finalBid = parseInt(bidAmount, 10);
    let currentBalance = parseFloat(localStorage.getItem("credit")) || 0;

    if (!postId || !finalBid) {
      console.error("Post ID or bid amount is missing");
      return;
    }

    console.log("Post ID:", postId);
    console.log("Highest Bid:", highestBid);

    await handleBidSubmission(postId, highestBid, finalBid);
    currentBalance -= finalBid;
    localStorage.setItem("credit", currentBalance);
  });

if (sessionStorage.getItem("updatedSuccess") === "true") {
  toastMessage("List has been updated successfully", "success");
  sessionStorage.removeItem("updatedSuccess");
}
