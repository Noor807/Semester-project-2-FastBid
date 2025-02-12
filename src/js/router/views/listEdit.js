import { fetchSingleAuction } from "../../api/list/singleListRead";
<<<<<<< HEAD
import { setLogoutListener } from "../../ui/global/logout";
import { handleEditAuctionFormSubmit } from "../../ui/list/update";
import { authGuard } from "../../utilities/authGuard";
import { populateFormWithAuctionData } from "../../utilities/populateform";

setLogoutListener
authGuard;

// Get auction ID from URL (assuming it's in the query parameter)
const urlParams = new URLSearchParams(window.location.search);
const auctionId = urlParams.get("post"); // Assuming URL has ?id=auction-id-123
const listData = await fetchSingleAuction(auctionId);
const editForm = document.getElementById("edit-auction-form");
populateFormWithAuctionData(listData.data);
if (editForm) {
  editForm.addEventListener("submit", (e) =>
    handleEditAuctionFormSubmit(e, auctionId)
  );
}

document.getElementById("logout-Btn").addEventListener("click", onLogout);

const hamburgerBtn = document.getElementById("hamburger-btn");
const navbarLinks = document.getElementById("navbar-links");

hamburgerBtn.addEventListener("click", () => {
  navbarLinks.classList.toggle("hidden");
});
=======
import { onLogout } from "../../ui/auth/logout";
import { handleEditAuctionFormSubmit } from "../../ui/list/update";
import { populateFormWithAuctionData } from "../../utilities/populateform";

// Get auction ID from URL (assuming it's in the query parameter)
const urlParams = new URLSearchParams(window.location.search);
const auctionId = urlParams.get('post'); // Assuming URL has ?id=auction-id-123
const listData = await fetchSingleAuction(auctionId)
const editForm = document.getElementById("edit-auction-form");
populateFormWithAuctionData(listData.data)
  if (editForm) {
    
   
    editForm.addEventListener("submit", (e) => handleEditAuctionFormSubmit(e, auctionId));
  }


  document.getElementById('logout-Btn').addEventListener('click' , onLogout)
 

>>>>>>> d2529e3fa30724d20abb14ad11292d996ff427d9
