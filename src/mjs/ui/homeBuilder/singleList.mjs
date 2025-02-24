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
    seller = "unknown",
    bids = "0",
    created = "Date",
    updated = "Date",
    endsAt = "Date",
    _count = { bids: 0 },
  } = auction || {};

  auctionDetailContainer.innerHTML = "";

  const img = document.createElement("img");
  if (media && media.length > 0) {
    img.src = media[0].url || "";
    img.alt = media[0].alt || "No description";
  }
  img.className = "w-full h-96 object-cover mb-6";

  const contentDiv = document.createElement("div");
  contentDiv.className = "flex flex-col md:flex-row gap-6 md:gap-7";

  const leftDiv = document.createElement("div");
  leftDiv.className = "flex-1";
  leftDiv.appendChild(img);

  const rightDiv = document.createElement("div");
  rightDiv.className = "flex-1";

  const titleElement = document.createElement("h2");
  titleElement.className = "text-xs font-bold ml-5 text-gray-800 mb-4";
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

export function initSingleAuctionPage() {
  const urlSearch = new URLSearchParams(window.location.search);
  const auctionId = urlSearch.get("post");

  if (auctionId) {
    fetchAndRenderSingleAuction(auctionId);
  } else {
    console.error("Auction ID is missing in the URL.");
  }
}

document.addEventListener("DOMContentLoaded", initSingleAuctionPage);
