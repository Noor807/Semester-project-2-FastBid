import { fetchAllAuctions } from "../../api/list/allList";
import { updateAdminButton } from "../../ui/global/loginAdmin.mjs";
import { renderAuctionPosts } from "../../ui/homeBuilder/allListing";
import { fetchPosts } from "../../ui/paginator/homePagination";
import { authGuard } from "../../utilities/authGuard";
import { toastMessage } from "../../utilities/toastMsg.mjs";
updateAdminButton();

authGuard;
fetchPosts();

const hamburgerBtn = document.getElementById("hamburger-btn");
const navbarLinks = document.getElementById("navbar-links");

hamburgerBtn.addEventListener("click", () => {
  navbarLinks.classList.toggle("hidden");
});

/**
 * Fetches auction listings with authentication and renders them to the DOM.
 */

async function fetchAndRenderAuctions() {
  try {
    const auctionData = await fetchAllAuctions();
    console.log("auctiondata", auctionData);

    renderAuctionPosts(auctionData.data);
  } catch (error) {
    console.error("Error fetching and rendering auctions:", error);
  }
}

fetchAndRenderAuctions();

if (sessionStorage.getItem("loggedIn") === "true") {
  toastMessage("Welcome to FastBid", "success");
  sessionStorage.removeItem("loggedIn");
}

if (sessionStorage.getItem("deleteList") === "true") {
  toastMessage("List has be deleted", "success");
  sessionStorage.removeItem("deleteList");
}
