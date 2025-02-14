 export async function generateAuctionBids(auctions) {
    const container = document.getElementById('myBids'); // Get the container element by its ID
  
    // Clear the container before adding new elements
    container.innerHTML = '';
  console.log('test',auctions);
  
    // Loop through the array of auctions and generate HTML for each
    auctions.forEach((auction) => {
      // Create the outer div (with flex-column and justify-between)
      const outerDiv = document.createElement('div');
      outerDiv.classList.add('flex', 'flex-col', 'justify-between');
  
      // Create the inner div (with flex-row for title and image)
      const innerDiv1 = document.createElement('div');
      innerDiv1.classList.add('flex', 'flex-row');
  
      const title = document.createElement('h3');
      title.textContent = auction.listing.title; // Auction title
  
      const img = document.createElement('img');
      img.src = auction.listing.media[0]?.url || ""; // Fallback if no media is available
      img.alt = auction.listing.media[0]?.alt || " Image";
  
      innerDiv1.appendChild(title);
      innerDiv1.appendChild(img);
  
      // Create the second div (with the bid amount)
      const innerDiv2 = document.createElement('div');
      const bid = document.createElement('p');
      bid.textContent = `Bid: $${auction.amount}`; // Auction bid amount (formatted as a decimal)
  
      innerDiv2.appendChild(bid);
  
      // Append the two inner divs to the outer div
      outerDiv.appendChild(innerDiv1);
      outerDiv.appendChild(innerDiv2);
  
      // Append the outer div to the container
      container.appendChild(outerDiv);
    });
  }
  