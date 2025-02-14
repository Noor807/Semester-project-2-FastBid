import { getHighestBidValue } from "../../utilities/higherBider";

// Function to generate HTML and export it
 export async function generateAuctionListing(auctions) {
    const container = document.getElementById('auctionContainer'); // Container to hold all auction listings
    container.innerHTML = ''
    // Loop through the array of auctions and generate HTML for each
    auctions.forEach((auction) => {
      // Create the section element
      const section = document.createElement('section');
      section.classList.add('flex', 'flex-row');
  
      // Create the first div (image and title)
      const div1 = document.createElement('div');
      div1.classList.add('flex', 'flex-col');
      const title = document.createElement('h3');
      title.innerText = auction.title; // Auction title
      const img = document.createElement('img');
      img.src = auction.media[0]?.url || ""; // Fallback if no media is available
      img.alt = auction.media[0]?.alt || " Image";
      div1.appendChild(title);
      div1.appendChild(img);
  
      // Create the second div (description and price)
      const { highestBid } = getHighestBidValue(auction);
      const div2 = document.createElement('div');
      div2.classList.add('flex', 'flex-col');
      const description = document.createElement('p');
      description.innerText = auction.description; // Auction description
      const price = document.createElement('p');
      price.innerText = `Price: $${highestBid || "0.00"}`
      div2.appendChild(description);
      div2.appendChild(price);
  
      // Create the third div (button)
      const div3 = document.createElement('div');
      div3.classList.add('flex', 'flex-col');
      const button = document.createElement('button');
      button.innerText = 'View Auctions';
      // Attach click event to the button
      button.addEventListener('click', () => {
        window.location.href = `/post/index.html?singleList=${auction.id}`; // Redirect to auction page
      });
      div3.appendChild(button);
  
      // Append the three divs to the section
      section.appendChild(div1);
      section.appendChild(div2);
      section.appendChild(div3);
  
      // Append the section to the container
      container.appendChild(section);
    });
  
   
  }
  