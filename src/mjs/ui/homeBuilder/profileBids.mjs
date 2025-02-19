export async function generateAuctionBids(auctions) {
    const container = document.getElementById('myBids'); // Get the container element by its ID
  
    // Clear the container before adding new elements
    container.innerHTML = '';
    console.log('test', auctions);
  
    // Loop through the array of auctions and generate HTML for each
    auctions.forEach((auction) => {
      // Create the outer div (with flex-column and justify-between for small screens, flex-row for large screens)
      const outerDiv = document.createElement('div');
      outerDiv.classList.add('flex', 'flex-col', 'sm:flex-row', 'justify-between', 'space-y-4', 'sm:space-y-0', 'p-4', 'border', 'border-blue-600', 'rounded-lg', 'shadow-lg');
  
      // Create the inner div for title and image (Stack vertically on small screens, horizontally on medium and up)
      const innerDiv1 = document.createElement('div');
      innerDiv1.classList.add('flex', 'flex-col', 'sm:flex-col', 'items-center', 'sm:items-start', 'space-y-2', 'sm:space-y-0');
  
      const title = document.createElement('h3');
      title.textContent = auction.listing.title; // Auction title
      title.classList.add('font-bold');
  
      const img = document.createElement('img');
      img.src = auction.listing.media[0]?.url || ""; // Fallback if no media is available
      img.alt = auction.listing.media[0]?.alt || "Image";
      img.classList.add('w-20', 'h-20', 'object-cover', 'sm:w-40', 'sm:h-40', 'rounded-lg', 'sm:mr-4');
  
      innerDiv1.appendChild(title);
      innerDiv1.appendChild(img);
  
      // Create the second div (with the bid amount)
      const innerDiv2 = document.createElement('div');
      innerDiv2.classList.add('flex', 'flex-row', 'items-center', 'sm:items-start', 'space-y-2');
  
      const bid = document.createElement('p');
      bid.textContent = `Bid: $${auction.amount}`; // Auction bid amount (formatted as a decimal)
      bid.classList.add('text-sm', 'font-semibold' , 'text-blue-800');
  
      innerDiv2.appendChild(bid);
  
      // Append the two inner divs to the outer div
      outerDiv.appendChild(innerDiv1);
      outerDiv.appendChild(innerDiv2);
  
      // Append the outer div to the container
      container.appendChild(outerDiv);
    });
  }
  