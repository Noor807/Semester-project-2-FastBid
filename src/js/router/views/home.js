
import { fetchAllAuctions } from "../../api/list/allList";
import { setLogoutListener } from "../../ui/global/logout";
import { renderAuctionPosts } from "../../ui/homeBuilder/allListing";
import { fetchPosts, goLeft, goRight } from "../../ui/paginator/homePagination";
import { authGuard } from "../../utilities/authGuard";



setLogoutListener
authGuard

fetchPosts();


document.getElementById("left").addEventListener("click", goLeft);
document.getElementById("right").addEventListener("click", goRight);
document.getElementById("hamburger-btn").addEventListener("click", () => {
const navbarLinks = document.getElementById("navbar-links");
navbarLinks.classList.toggle("hidden");
});


/**
 * Fetches auction listings with authentication and renders them to the DOM.
 */
 async function fetchAndRenderAuctions() {
    try {
      // Fetch the auction data with authentication
      const auctionData = await fetchAllAuctions();
  console.log('auctiondata' , auctionData);
  
      // Pass the fetched auction data to the render function to display on the UI
      renderAuctionPosts(auctionData.data);
    } catch (error) {
      console.error("Error fetching and rendering auctions:", error);
    }
  }

  fetchAndRenderAuctions();