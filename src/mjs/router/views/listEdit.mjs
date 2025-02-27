import { fetchSingleAuction } from "../../api/list/singleListRead";
import { handleEditAuctionFormSubmit } from "../../ui/list/update";
import { authGuard } from "../../utilities/authGuard";
import { populateFormWithAuctionData } from "../../utilities/populateform";


authGuard;

const urlParams = new URLSearchParams(window.location.search);
const auctionId = urlParams.get("post");
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
