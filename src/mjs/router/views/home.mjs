
import { fetchAllAuctions } from "../../api/list/allList";
import { fetchAuctionProfile } from "../../api/profile/auctionProfile";
import { onLogout } from "../../ui/auth/logout";
import { renderAuctionPosts } from "../../ui/homeBuilder/allListing";
import { fetchPosts, goLeft, goRight } from "../../ui/paginator/homePagination";
import { authGuard } from "../../utilities/authGuard";
import { toastMessage } from "../../utilities/toastMsg.mjs";


authGuard
onLogout
fetchPosts();



document.getElementById("logout-Btn").addEventListener("click", onLogout);

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


  const verifyUser = localStorage.getItem('verify_user');
  console.log('verify_user:', verifyUser); // Log verify_user value
  
  if (verifyUser === 'true') {
    const user = JSON.parse(localStorage.getItem('adminUser'));
    const token = localStorage.getItem('token');
  
    console.log('adminUser:', user); // Log adminUser
    console.log('token:', token); // Log token
  
    if (user && token) {
      fetchAuctionProfile(user.name, token);
    } else {
      console.error('User or token is missing!');
    }
  } else {
    console.log('User is not verified');
  }
  
if (sessionStorage.getItem('loggedIn') === 'true') {
  toastMessage('Welcome to FastBid' ,"success")
  //sessionStorage.removeItem('loggedIn')
}


