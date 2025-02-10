/**
 * Renders auction posts into the DOM inside the element with ID "AuctionContainer".
 * Each auction is displayed with an image, title, seller, creation date, and tags.
 *
 * @param {Array<Object>} array - List of auction post objects.
 *   @param {string} [array[].id="unknown"] - Unique ID of the auction post.
 *   @param {Object} [array[].media={}] - Media details for the auction post.
 *     @param {string} [array[].media.url=""] - Image URL of the auction.
 *     @param {string} [array[].media.alt="No description"] - Image alt text for the auction.
 *   @param {string} [array[].title="Untitled Auction"] - Title of the auction.
 *   @param {Object} [array[].seller={}] - Seller details.
 *     @param {string} [array[].seller.name="Unknown Seller"] - Seller's name.
 *   @param {string} [array[].created="Date"] - Creation date in ISO format.
 *   @param {Array<string>} [array[].tags=[]] - Tags associated with the auction.
 */

export function renderAuctionPosts(auctions) {
    const listingsContainer = document.getElementById("auctionContainer");  // Assuming you have a container for the listings
  
    auctions.forEach((auction) => {
      // Create the outer div for listing card
      const listingCard = document.createElement("div");
      listingCard.className = "listing-card cursor-pointer";
      listingCard.addEventListener("click" , ()=> {
        window.location.href = `/post/index.html?singleList=${auction.id}`
      })
  
      // Create a wrapper div for the image
      const imageWrapper = document.createElement("div");
      imageWrapper.className = "image-wrapper"; // You can add custom styles for this class
  
      // Create and set the image
      const img = document.createElement("img");
      img.src = auction.media[0]?.url || "";  // Fallback if no media is available
      img.alt = auction.media[0]?.alt || "Auction Image";
      imageWrapper.appendChild(img); // Add image inside the wrapper div
  
      listingCard.appendChild(imageWrapper); // Add image wrapper to listing card
  
      // Create inner div for the content
      const contentDiv = document.createElement("div");
  
      // Create the top section (title and category)
      const topDiv = document.createElement("div");
      topDiv.id = "top";
      const title = document.createElement("h2");
      title.textContent = auction.title;
      topDiv.appendChild(title);
      const category = document.createElement("h3");
      category.textContent = auction.tags[0] || "Unknown Category";  // Fallback for category
      topDiv.appendChild(category);
      contentDiv.appendChild(topDiv);
  
      // Create the middle section (current price and bids)
      const middleDiv = document.createElement("div");
      middleDiv.className = "flex justify-between";
      middleDiv.id = "middle";
      const currentPrice = document.createElement("p");
      currentPrice.textContent = `Current Price: $${auction.price || "0.00"}`;  // Assuming auction price exists
      middleDiv.appendChild(currentPrice);
      const bidsLink = document.createElement("a");
      bidsLink.className = "x-2 y-2 font-semibold rounded-sm text-blue-700";
      bidsLink.href = `/auction/${auction.id}`;  // Assuming auction link goes to a single auction page
      bidsLink.textContent = `Bids: ${auction._count?.bids || 0}`;
      middleDiv.appendChild(bidsLink);
      contentDiv.appendChild(middleDiv);
  
      // Create the bottom section (created, updated, endsAt, shipping)
      const bottomDiv = document.createElement("div");
      bottomDiv.className = "flex justify-between items-end";
      bottomDiv.id = "bottom";
      const timeDiv = document.createElement("div");
      timeDiv.className = "flex flex-col";
  
      const createdP = document.createElement("p");
      createdP.textContent = `Created: ${new Date(auction.created).toLocaleDateString()}`;
      timeDiv.appendChild(createdP);
  
      const updatedP = document.createElement("p");
      updatedP.textContent = `Updated: ${new Date(auction.updated).toLocaleDateString()}`;
      timeDiv.appendChild(updatedP);
  
      const endsAtP = document.createElement("p");
      endsAtP.textContent = `Ends At: ${new Date(auction.endsAt).toLocaleDateString()}`;
      timeDiv.appendChild(endsAtP);
  
      bottomDiv.appendChild(timeDiv);
  
      // Free shipping info
      const shippingP = document.createElement("p");
      shippingP.textContent = auction.freeShipping ? "Free Shipping" : "Shipping Costs Apply";
      bottomDiv.appendChild(shippingP);
  
      contentDiv.appendChild(bottomDiv);
  
      // Append the content div to the listing card
      listingCard.appendChild(contentDiv);
  
      // Append the listing card to the listings container
      listingsContainer.appendChild(listingCard);
    });
  }
  