import { placeBidApi } from "../../api/list/bid";


export async function handleBidSubmission(id, highestBid, bidAmount) {
    const credit = parseFloat(localStorage.getItem("credit")) || 0;
    const token = localStorage.getItem("token");
  
    // Logging for debugging
    console.log("Bid Submission - Credit:", credit);
    console.log("Bid Submission - Token:", token);
    console.log("Bid Submission - Amount:", bidAmount);
    console.log("Bid Submission - Highest Bid:", highestBid);
  
    if (!token) {
      alert("You need to log in to place a bid.");
      console.log("No token found. Bid not placed.");
      return;
    }
  
    if (!bidAmount || bidAmount <= 0) {
      alert("Please enter a valid bid amount.");
      console.log("Invalid bid amount:", bidAmount);
      return;
    }
  
    if (bidAmount <= highestBid) {
      alert(`Your bid must be higher than ${highestBid}.`);
      console.log("Bid amount is not higher than the highest bid.");
      return;
    }
  
    if (bidAmount > credit) {
      alert("You do not have enough funds to place a bid.");
      console.log("Bid amount exceeds available credit.");
      return;
    }
  
    // Everything checks out, place the bid
    try {
      const result = await placeBidApi(id, bidAmount, token);
  
      if (result.success) {
        alert(result.message); // Success
        console.log("Bid placed successfully:", result.message);
      } else {
        alert(`Failed to place bid: ${result.message}`);
        console.log("Bid failed:", result.message);
      }
    } catch (error) {
      console.error("Error placing bid:", error);
      alert("There was an error placing your bid. Please try again.");
      console.log("Error placing bid:", error);
    }
  }
  