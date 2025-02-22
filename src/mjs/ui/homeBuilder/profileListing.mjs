import {getHighestBidValue } from "../../utilities/higherBider.mjs";


export async function generateAuctionListing(dataArray) {
  const auctionContainer = document.getElementById('auctionContainer');
  
  // Clear any existing content in the container
  auctionContainer.innerHTML = '';
  
  // Loop through each item in the array using forEach
  dataArray.forEach(item => {
    // Create section element
    const section = document.createElement('section');
    section.className = 'flex flex-col w-full border-2 border-gray-500 p-4 ';
    
    // Create title element
    const title = document.createElement('h3');
    title.className = 'text-xs font-bold';
    title.textContent = item.title; // Assuming each item has a 'title' property
    
    // Create the div that will wrap image, description, price, and button
    const itemDiv = document.createElement('div');
    itemDiv.className = 'flex flex-col sm:flex-row gap-2 relative w-full';
    
    // Create img element using item.media[0].url and item.media[0].alt
    const img = document.createElement('img');
    img.className = 'w-20 h-20';
    img.src = item.media[0]?.url || ''; // Use item.media[0].url for the image URL
    img.alt = item.media[0]?.alt || 'Item Image'; // Use item.media[0].alt for the alt text
    
    // Get the highest bid value for the item
    const { highestBid } = getHighestBidValue(item); // Destructure the highest value

    // Create the inner div for description and price
    const textDiv = document.createElement('div');
    textDiv.className = 'flex flex-col gap-2';
    
    // Create paragraph for description
    const description = document.createElement('p');
    description.textContent = item.description; // Assuming each item has a 'description' property
    
    // Create price paragraph and update to show highest value
    const price = document.createElement('p');
    price.className = 'font-semibold text-blue-900 '
    price.textContent = `Price: $${highestBid}`; // Use highestValue for price
    
    // Append description and price to textDiv
    textDiv.appendChild(description);
    textDiv.appendChild(price);
    
    // Create button
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = 'View auction'; // Button text
    button.className = ' static md:absolute  md:right-8 md:top-1/2 md:-translate-y-1/2 bg-blue-gray w-fit p-1 m-auto font-semibold  text-white border-2';
    button.addEventListener("click", () => {
      window.location.href = `/post/index.html?singleList=${item.id}`;
    });
    
    // Append image, textDiv (description, price), and button to itemDiv
    itemDiv.appendChild(img);
    itemDiv.appendChild(textDiv);
    itemDiv.appendChild(button);
    
    // Append title and itemDiv to section
    section.appendChild(title);
    section.appendChild(itemDiv);
    
    // Append the created section to the auction container
    auctionContainer.appendChild(section);
  });
}






