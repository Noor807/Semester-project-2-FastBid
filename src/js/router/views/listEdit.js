import { fetchSingleAuction } from "../../api/list/singleListRead";
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
 

