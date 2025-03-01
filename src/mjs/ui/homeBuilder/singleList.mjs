/**
 * 
 * Renders the details of a single auction on the page.
 *
 * @param {Object} auction - The auction object containing all the details to display.
 * @param {string} auction.title - The title of the auction.
 * @param {string} auction.description - The description of the auction.
 * @param {Array<string>} auction.tags - An array of tags related to the auction.
 * @param {Array<Object>} auction.media - An array of media objects containing URLs and alt text for images.
 * @param {Object} auction.seller - The seller object.
 * @param {string} auction.seller.name - The name of the seller.
 * @param {string} auction.bids - The number of bids placed on the auction.
 * @param {string} auction.created - The creation date of the auction.
 * @param {string} auction.updated - The date when the auction was last updated.
 * @param {string} auction.endsAt - The date when the auction ends.
 * @param {Object} auction._count - The count of bids placed on the auction.
 * @param {number} auction._count.bids - The total number of bids placed on the auction.
 */
export function renderSingleAuction(auction) {
  const auctionDetailContainer = document.querySelector(
    "#AuctionDetailContainer"
  );

  if (!auctionDetailContainer) {
    console.error('No element with id "AuctionDetailContainer" found.');
    return;
  }

  const {
    title = "Untitled Auction",
    description = "No description available",
    tags = [],
    media = [],
    seller = { name: "Unknown Seller" },
    bids = "0",
    created = "Date",
    updated = "Date",
    endsAt = "Date",
    _count = { bids: 0 },
  } = auction || {};

  auctionDetailContainer.innerHTML = "";

  const img = document.createElement("img");
  if (media && media.length > 0) {
    img.src = media[0].url || "path/to/placeholder-image.jpg";
    img.alt = media[0].alt || "No description available";
  }
  img.className = "w-full h-96 object-cover mb-6";
  img.loading = "lazy";
  img.alt = "";

  const contentDiv = document.createElement("div");
  contentDiv.className = "flex flex-col md:flex-row gap-6 md:gap-7";

  const leftDiv = document.createElement("div");
  leftDiv.className = "flex-1";
  leftDiv.appendChild(img);

  const rightDiv = document.createElement("div");
  rightDiv.className = "flex-1";

  const titleElement = document.createElement("h2");
  titleElement.className = "text-sm font-bold ml-5 text-gray-800 mb-4";
  titleElement.textContent = title;
  rightDiv.appendChild(titleElement);

  const tagsElement = document.createElement("p");
  tagsElement.className = "text-xs text-gray-700 ml-5 mb-4";
  tagsElement.textContent =
    tags.length > 0 ? `Tags: ${tags.join(", ")}` : "No tags available";
  rightDiv.appendChild(tagsElement);

  const descriptionElement = document.createElement("p");
  descriptionElement.className = " text-gray-700 ml-5  mb-4";
  descriptionElement.textContent = description;
  rightDiv.appendChild(descriptionElement);

  const sellerElement = document.createElement("p");
  sellerElement.className = " text-gray-800 font-semibold ml-5 mb-2";
  sellerElement.textContent = `Seller: ${seller.name || "Unknown Seller"}`;
  rightDiv.appendChild(sellerElement);

  const createdElement = document.createElement("p");
  createdElement.className = " text-gray-700 font-semibold ml-5 mb-2";
  createdElement.textContent = `Created: ${
    created ? created.slice(0, 10) : "Unknown Date"
  }`;
  rightDiv.appendChild(createdElement);

  const endsAtElement = document.createElement("p");
  endsAtElement.className = " text-gray-700 font-semibold ml-5 mb-2";
  endsAtElement.textContent = `Ends at: ${
    endsAt ? endsAt.slice(0, 10) : "Unknown Date"
  }`;
  rightDiv.appendChild(endsAtElement);

  contentDiv.appendChild(leftDiv);
  contentDiv.appendChild(rightDiv);

  auctionDetailContainer.appendChild(contentDiv);

  const bidsElement = document.createElement("p");
  bidsElement.id = "bidHistory";
  bidsElement.className =
    "text-sm ml-5 font-bold text-gray-600 hover:text-blue-800 mt-6 cursor-pointer hover:underline";
  bidsElement.textContent = `Bids: ${_count.bids}`;
  auctionDetailContainer.appendChild(bidsElement);
}

