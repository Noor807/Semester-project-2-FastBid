import { fetchSingleAuction } from "../../api/list/singleListRead.mjs";
import { updateAdminButton } from "../../ui/global/loginAdmin.mjs";
import { renderSingleAuction } from "../../ui/homeBuilder/singleList.mjs";
import { handleBidSubmission } from "../../ui/list/bid.mjs";
import { createBidHistoryModal } from "../../ui/list/bidHistory.mjs";
import { onDeletePost } from "../../ui/list/delete.mjs";
import { setupHamburgerMenu } from "../../utilities/hamburgerMenu.mjs";
import { getHighestBidValue } from "../../utilities/higherBider.mjs";
import { toastMessage } from "../../utilities/toastMsg.mjs";

setupHamburgerMenu();
updateAdminButton();

const urlSearch = new URLSearchParams(window.location.search);
const postId = urlSearch.get("singleList");

async function initialize() {
  try {
    const auctionData = await fetchSingleAuction(postId);

    await handleAdminActions(auctionData.data);

    const { highestBid } = getHighestBidValue(auctionData.data);
    document.getElementById("highestBid").textContent = `${highestBid}$`;

    renderSingleAuction(auctionData.data);

    setupDeleteButton(postId);

    setupEditButton(postId);

    setupBidHistoryButton(auctionData.data.bids);

    setupBidForm(auctionData.data);

    showUpdatedSuccessToast();
  } catch (error) {
    console.error("Error during auction page initialization:", error);
  }
}

async function handleAdminActions(data) {
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

function setupDeleteButton(postId) {
  const delButton = document.querySelector(".del-btn");
  if (delButton) {
    delButton.setAttribute("data-id", postId);
    delButton.addEventListener("click", onDeletePost);
  }
}

function setupEditButton(postId) {
  const editButton = document.querySelector(".edit-btn");
  if (editButton) {
    editButton.addEventListener("click", () => {
      window.location.href = `/post/edit/?post=${postId}`;
    });
  }
}

function setupBidHistoryButton(bids) {
  const bidHistoryBtn = document.getElementById("bidHistory");
  bidHistoryBtn.addEventListener("click", () => {
    createBidHistoryModal(bids);
  });

  const openBidHistory = localStorage.getItem("trigger");
  if (openBidHistory === "true") {
    if (bidHistoryBtn) {
      bidHistoryBtn.click();
    } else {
      console.warn("Bid history button not found");
    }
    localStorage.removeItem("trigger");
  }
}

function setupBidForm(auctionData) {
  document
    .getElementById("placeBid")
    .addEventListener("submit", async (event) => {
      event.preventDefault();

      const bidAmount = document.getElementById("bid-amount").value;
      const finalBid = parseInt(bidAmount, 10);
      let currentBalance = parseFloat(localStorage.getItem("credit")) || 0;

      if (!finalBid || finalBid <= 0) {
        console.error("Invalid bid amount");
        toastMessage("Please enter a valid bid amount", "error");
        return;
      }

      await handleBidSubmission(postId, auctionData.highestBid, finalBid);
      currentBalance -= finalBid;
      localStorage.setItem("credit", currentBalance);
    });
}

function showUpdatedSuccessToast() {
  if (sessionStorage.getItem("updatedSuccess") === "true") {
    toastMessage("List has been updated successfully", "success");
    sessionStorage.removeItem("updatedSuccess");
  }
}

initialize();
