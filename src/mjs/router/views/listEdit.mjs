import { fetchSingleAuction } from "../../api/list/singleListRead";
import { handleEditAuctionFormSubmit } from "../../ui/list/update";
import { authGuard } from "../../utilities/authGuard";
import { setupHamburgerMenu } from "../../utilities/hamburgerMenu.mjs";
import { populateFormWithAuctionData } from "../../utilities/populateform";
import { onLogout } from "../../ui/auth/logout";
import { prepareAuthHeaders } from "../../utilities/authUtils.mjs";
prepareAuthHeaders();

setupHamburgerMenu();
authGuard();

async function initialize() {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const auctionId = urlParams.get("post");

    if (!auctionId) {
      throw new Error("Auction ID not provided in the URL.");
    }

    const listData = await fetchSingleAuction(auctionId);
    const editForm = document.getElementById("edit-auction-form");

    if (listData && listData.data) {
      populateFormWithAuctionData(listData.data);
    } else {
      throw new Error("Failed to fetch auction data.");
    }

    if (editForm) {
      editForm.addEventListener("submit", (e) =>
        handleEditAuctionFormSubmit(e, auctionId)
      );
    } else {
      console.error("Edit form not found.");
    }
  } catch (error) {
    console.error("Error initializing the page:", error.message || error);
  }
}

initialize();

document.getElementById("logout-Btn").addEventListener("click", onLogout);
