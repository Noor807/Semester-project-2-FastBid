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

import { getHighestBidValue } from "../../utilities/higherBider.mjs";

export function renderAuctionPosts(auctions) {
  const listingsContainer = document.getElementById("auctionContainer");
  listingsContainer.innerHTML = "";

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
    const hasEnded = endedListing === "Listing ended";

    const listingCard = document.createElement("div");
    listingCard.className =
      "listing-card cursor-pointer p-4 border-2 border-black-600 relative rounded-lg shadow-md transition-transform transform hover:scale-105"; 
    listingCard.addEventListener("click", () => {
      window.location.href = `/post/index.html?singleList=${auction.id}`;
    });

    if (hasEnded) {
      listingCard.classList.add("relative");

      const endedList = document.createElement("div");
      endedList.className =
        "absolute inset-0 flex justify-center items-center bg-light-blue opacity-80 text-black p-4 text-xs font-semibold";
      endedList.textContent = "Auction of list is ended";

      listingCard.appendChild(endedList);
    }

    const imageWrapper = document.createElement("div");
    imageWrapper.className = "image-wrapper mb-4";

    const img = document.createElement("img");
    img.src = auction.media[0]?.url || "";
    img.alt = auction.media[0]?.alt || " Image";
    img.className = "w-full h-48 object-cover rounded-md";

    imageWrapper.appendChild(img);
    listingCard.appendChild(imageWrapper);

    const contentDiv = document.createElement("div");

    const topDiv = document.createElement("div");
    topDiv.className = "mb-4 border-b border-gray-300";

    const title = document.createElement("h2");
    title.textContent = auction.title;
    title.className = "font-bold text-gray-900";
    topDiv.appendChild(title);

    const category = document.createElement("h3");
    category.textContent = auction.tags[0] || "Unknown Category";
    category.className = "text-gray-600";
    topDiv.appendChild(category);

    contentDiv.appendChild(topDiv);

    const { highestBid } = getHighestBidValue(auction);
    const middleDiv = document.createElement("div");
    middleDiv.className = "flex justify-between items-center";
    const currentPrice = document.createElement("p");
    currentPrice.textContent = `Current Price: $${highestBid || "0.00"}`;
    currentPrice.className = "font-semibold text-gray-900";
    middleDiv.appendChild(currentPrice);

    const bidsLink = document.createElement("a");
    bidsLink.addEventListener("click", () => {
      localStorage.setItem("trigger", true);
    });

    bidsLink.className =
      "cursor-pointer font-semibold bg-blue-gray  text-white hover:bg-white hover:text-blue-gray px-3 py-1 rounded-md border border-orange-500 focus:outline-none focus:ring-2 focus:ring-blue-500";

    bidsLink.href = `/post/index.html?singleList=${auction.id}`;

    bidsLink.textContent = `Bids: ${auction._count?.bids || 0}`;

    middleDiv.appendChild(bidsLink);
    contentDiv.appendChild(middleDiv);

    const bottomDiv = document.createElement("div");
    bottomDiv.className = "flex justify-between items-end mt-4";
    const timeDiv = document.createElement("div");
    timeDiv.className = "flex flex-col";

    const createdP = document.createElement("p");
    createdP.textContent = `Created: ${new Date(
      auction.created
    ).toLocaleDateString()}`;
    createdP.className = "text-gray-600";
    timeDiv.appendChild(createdP);

  
    const updatedP = document.createElement("p");
    updatedP.textContent = `Updated: ${new Date(
      auction.updated
    ).toLocaleDateString()}`;
    updatedP.className = "text-gray-600";
    timeDiv.appendChild(updatedP);

    const endsAtP = document.createElement("p");
    endsAtP.textContent = `Ends At: ${new Date(
      auction.endsAt
    ).toLocaleDateString()}`;
    endsAtP.className = "text-gray-600";

    timeDiv.appendChild(endsAtP);

    bottomDiv.appendChild(timeDiv);

    const shippingP = document.createElement("p");
    shippingP.textContent = auction.freeShipping
      ? "Free Shipping"
      : "Shipping Cost";
    shippingP.className = "text-black-600 font-semibold";
    bottomDiv.appendChild(shippingP);

    contentDiv.appendChild(bottomDiv);

    listingCard.appendChild(contentDiv);

    listingsContainer.appendChild(listingCard);
  });
}

export function findEndedList(endsAt) {
  return new Date(endsAt) <= new Date() ? "Listing ended" : "";
}
