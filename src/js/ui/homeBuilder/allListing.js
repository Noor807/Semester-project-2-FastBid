/**
 * Renders auction posts into the DOM inside the element with ID "AuctionContainer".
 * Each auction is displayed with an image, title, seller, creation date, and tags.
 *
 *   @param {Array<Object>} array - List of auction post objects.
 *   @param {string} [array[].id="unknown"] - Unique ID of the auction post.
 *   @param {Object} [array[].media={}] - Media details for the auction post.
 *   @param {string} [array[].media.url=""] - Image URL of the auction.
 *   @param {string} [array[].media.alt="No description"] - Image alt text for the auction.
 *   @param {string} [array[].title="Untitled Auction"] - Title of the auction.
 *   @param {Object} [array[].seller={}] - Seller details.
 *   @param {string} [array[].seller.name="Unknown Seller"] - Seller's name.
 *   @param {string} [array[].created="Date"] - Creation date in ISO format.
 *   @param {Array<string>} [array[].tags=[]] - Tags associated with the auction.
 */

import { getHighestBidValue } from "../../utilities/higherBider";

// renderAuctionPosts.js

export function renderAuctionPosts(auctions) {
  const listingsContainer = document.getElementById("auctionContainer"); // Assuming you have a container for the listings
  listingsContainer.innerHTML = ''
  // Apply Tailwind grid layout with responsive classes
  listingsContainer.classList.add(
    "grid", 
    "gap-6", 
    "sm:grid-cols-1",   
    "md:grid-cols-2",  
    "lg:grid-cols-2",   
    "xl:grid-cols-3"    
  );
  
  
  auctions.forEach((auction) => {
    const endedListing = findEndedList(auction.endsAt);
    const hasEnded = endedListing === 'Listing ended';
    
    // Create the outer div for listing card
    const listingCard = document.createElement("div");
    listingCard.className =
      "listing-card cursor-pointer p-4 border-2 border-black-600 relative rounded-lg shadow-md transition-transform transform hover:scale-105"; // Added padding, border, and hover effects
    listingCard.addEventListener("click", () => {
      window.location.href = `/post/index.html?singleList=${auction.id}`;
    });
    
    if (hasEnded) {
      listingCard.classList.add('relative');  // Add opacity and relative positioning to the card

      // Create the "Auction Ended" message div
      const endedList = document.createElement("div");
      endedList.className = 'absolute inset-0 flex justify-center items-center bg-light-blue opacity-80 text-black p-4 text-sm font-semibold';
      endedList.textContent = 'Auction of list is ended';

      // Append the "ended" message to the listing card
      listingCard.appendChild(endedList);
    }

    // Create a wrapper div for the image
    const imageWrapper = document.createElement("div");
    imageWrapper.className = "image-wrapper mb-4"; // Spacing between image and content

    // Create and set the image
    const img = document.createElement("img");
    img.src = auction.media[0]?.url || ""; // Fallback if no media is available
    img.alt = auction.media[0]?.alt || " Image";
    img.className = "w-full h-48 object-cover rounded-md"; // Full width, fixed height, rounded corners, and object-cover

    imageWrapper.appendChild(img); // Add image inside the wrapper div
    listingCard.appendChild(imageWrapper); // Add image wrapper to listing card

    // Create inner div for the content
    const contentDiv = document.createElement("div");

    // Create the top section (title and category)
    const topDiv = document.createElement("div");
    topDiv.className = "mb-4"; // Margin bottom for spacing between sections
    const title = document.createElement("h2");
    title.textContent = auction.title;
    title.className = "font-bold text-gray-900"; // Title styling
    topDiv.appendChild(title);
    const category = document.createElement("h3");
    category.textContent = auction.tags[0] || "Unknown Category"; // Fallback for category
    category.className = "text-gray-600"; // Category styling
    topDiv.appendChild(category);
    contentDiv.appendChild(topDiv);

    // Create the middle section (current price and bids)
    const { highestBid } = getHighestBidValue(auction);
    const middleDiv = document.createElement("div");
    middleDiv.className = "flex justify-between items-center"; // Flexbox for left-right alignment
    const currentPrice = document.createElement("p");
    currentPrice.textContent = `Current Price: $${highestBid || "0.00"}`; // Assuming auction price exists
    currentPrice.className = "font-semibold text-gray-900"; // Price styling
    middleDiv.appendChild(currentPrice);

    const bidsLink = document.createElement("a");
    bidsLink.addEventListener('click' , ()=>{
      localStorage.setItem('trigger', true)
    })
    bidsLink.className = "text-blue-600 hover:underline"; // Link styling with hover effect
    bidsLink.href = `/post/index.html?singleList=${auction.id}`; // Assuming auction link goes to a single auction page
    bidsLink.textContent = `Bids: ${auction._count?.bids || 0}`;
    
    middleDiv.appendChild(bidsLink);
    contentDiv.appendChild(middleDiv);

    // Create the bottom section (created, updated, endsAt, shipping)
    const bottomDiv = document.createElement("div");
    bottomDiv.className = "flex justify-between items-end mt-4"; // Flexbox with margin-top for spacing
    const timeDiv = document.createElement("div");
    timeDiv.className = "flex flex-col"; // Stack the time-related info

    const createdP = document.createElement("p");
    createdP.textContent = `Created: ${new Date(auction.created).toLocaleDateString()}`;
    createdP.className = "text-gray-600"; // Time info styling
    timeDiv.appendChild(createdP);

    const updatedP = document.createElement("p");
    updatedP.textContent = `Updated: ${new Date(auction.updated).toLocaleDateString()}`;
    updatedP.className = "text-gray-600"; // Time info styling
    timeDiv.appendChild(updatedP);

    const endsAtP = document.createElement("p");
    endsAtP.textContent = `Ends At: ${new Date(auction.endsAt).toLocaleDateString()}`;
    endsAtP.className = "text-gray-600"; // Time info styling
    timeDiv.appendChild(endsAtP);

    bottomDiv.appendChild(timeDiv);

    // Free shipping info
    const shippingP = document.createElement("p");
    shippingP.textContent = auction.freeShipping
      ? "Free Shipping"
      : "Shipping Costs Apply";
    shippingP.className = "text-black-600"; // Shipping info styling
    bottomDiv.appendChild(shippingP);

    contentDiv.appendChild(bottomDiv);

    // Append the content div to the listing card
    listingCard.appendChild(contentDiv);

    // Append the listing card to the listings container
    listingsContainer.appendChild(listingCard);
  });
}

export function findEndedList(endsAt) {
  return new Date(endsAt) <= new Date() ? "Listing ended" : "";
}
