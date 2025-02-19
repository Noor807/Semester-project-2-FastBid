import { getHighestBidValue } from "../../utilities/higherBider";

// Function to generate the winning auction elements and export them
 export async function generateWinningAuctions(winningAuctions) {
    const container = document.getElementById('winList'); // Get the container element by its ID
  
    // Clear the container before adding new elements
    container.innerHTML = '';
  if (winningAuctions.length === 0) {
    container.className = 'w-full h-20 bg-red'
    container.textContent = 'Sorry you havent won anything yet'
  }
    // Loop through the array of winning auctions and generate HTML for each
    winningAuctions.forEach((auction) => {
      // Create the outer div (with flex-column)
      const outerDiv = document.createElement('div');
      outerDiv.classList.add('flex', 'flex-col');
  
      // Create the inner div (with flex-column for title and image)
      const innerDiv1 = document.createElement('div');
      innerDiv1.classList.add('flex', 'flex-col');
  
      const title = document.createElement('h3');
      title.innerText = auction.title; // Auction title
  
      const img = document.createElement('img');
      img.src = auction.media[0]?.url || ""; // Fallback if no media is available
      img.alt = auction.media[0]?.alt || " Image";
  
      innerDiv1.appendChild(title);
      innerDiv1.appendChild(img);
  
      // Create the second div (with the won price)
      const { highestBid } = getHighestBidValue(auction);
      const innerDiv2 = document.createElement('div');
      const wonPrice = document.createElement('p');
      wonPrice.textContent = `Won for: $${highestBid}`; // Auction won price (formatted)
  
      innerDiv2.appendChild(wonPrice);
  
      // Append the two inner divs to the outer div
      outerDiv.appendChild(innerDiv1);
      outerDiv.appendChild(innerDiv2);
  
      // Append the outer div to the container
      container.appendChild(outerDiv);
    });
  }
  