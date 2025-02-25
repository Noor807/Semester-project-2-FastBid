import { placeBidApi } from "../../api/list/bid.mjs";
import { toastMessage } from "../../utilities/toastMsg.mjs";

export async function handleBidSubmission(id, highestBid, bidAmount) {
  const credit = parseFloat(localStorage.getItem("credit")) || 0;
  const token = localStorage.getItem("token");

  if (!token) {
   toastMessage("You need to log in to place a bid.", 'alert');

    return;
  }

  if (!bidAmount || bidAmount <= 0) {
    toastMessage("Please enter a valid bid amount.", 'alert');

    return;
  }

  if (bidAmount <= highestBid) {
    toastMessage(`Your bid must be higher than ${highestBid}.`, 'alert');

    return;
  }

  if (bidAmount > credit) {
    toastMessage("You do not have enough funds to place a bid.",'alert');

    return;
  }

  try {
    const result = await placeBidApi(id, bidAmount, token);

    if (result) {
      toastMessage(result.message, 'success');
    } else {
      toastMessage(`Failed to place bid: ${result.message}`, 'error');
    }
  } catch (log) {
    toastMessage("There was an log placing your bid. Please try again.", 'error');
  }
}
