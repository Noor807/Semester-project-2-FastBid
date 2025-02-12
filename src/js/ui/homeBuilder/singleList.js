
/////////// This function is responsible for rendering the auction details into the DOM
export function renderSingleAuction(auction) {
  const auctionDetailContainer = document.querySelector(
    "#AuctionDetailContainer"
  );

  if (!auctionDetailContainer) {
    console.error('No element with id "AuctionDetailContainer" found.');
    return;
  }

  // Destructure the auction object
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

  // Clear the container before appending new auction data
  auctionDetailContainer.innerHTML = "";

  // Create image element for auction if media exists
  const img = document.createElement("img");
  if (media && media.length > 0) {
    img.src = media[0].url || "";
    img.alt = media[0].alt || "No description";
  }
  img.className = "w-full h-70 object-cover rounded-lg mb-6";

  // Create auction details container
  const contentDiv = document.createElement("div");
  contentDiv.className = "flex flex-row md:flex-row gap-6 md:gap-12"; // Flex container with responsive layout

  // Left side - Image and details
  const leftDiv = document.createElement("div");
  leftDiv.className = "flex-1"; // Make sure this takes up full width on smaller screens and part on larger ones
  leftDiv.appendChild(img);

  // Right side - Title, Description, etc.
  const rightDiv = document.createElement("div");
  rightDiv.className = "flex-1"; // Ensures this takes full width on smaller screens

  // Create title element for auction
  const titleElement = document.createElement("h2");
  titleElement.className = "text-sm font-semibold text-gray-800 mb-4";
  titleElement.textContent = title;
  rightDiv.appendChild(titleElement);

    // Create tags element for auction
    const tagsElement = document.createElement("p");
    tagsElement.className = "text-xs text-gray-700 mb-4";
    tagsElement.textContent =
      tags.length > 0 ? `Tags: ${tags.join(", ")}` : "No tags available";
    rightDiv.appendChild(tagsElement);

  // Create description element for auction
  const descriptionElement = document.createElement("p");
  descriptionElement.className = " text-gray-800 mb-4";
  descriptionElement.textContent = description;
  rightDiv.appendChild(descriptionElement);

  // Create seller element for auction (you can modify this according to your data)
  const sellerElement = document.createElement("p");
  sellerElement.className = " text-gray-600 mb-2";
  sellerElement.textContent = `Seller: ${seller.name || "Unknown Seller"}`; // Update with actual seller info if available
  rightDiv.appendChild(sellerElement);

  // Create created date element for auction
  const createdElement = document.createElement("p");
  createdElement.className = " text-gray-500 mb-2";
  createdElement.textContent = `Created: ${
    created ? created.slice(0, 10) : "Unknown Date"
  }`;
  rightDiv.appendChild(createdElement);



  // Create endsAt date element for auction
  const endsAtElement = document.createElement("p");
  endsAtElement.className = " text-gray-500 mb-2";
  endsAtElement.textContent = `Ends at: ${
    endsAt ? endsAt.slice(0, 10) : "Unknown Date"
  }`;
  rightDiv.appendChild(endsAtElement);

  // Append left and right div to the contentDiv
  contentDiv.appendChild(leftDiv);
  contentDiv.appendChild(rightDiv);

  // Append content to the container
  auctionDetailContainer.appendChild(contentDiv);

  // Optionally, you can also display the number of bids
  const bidsElement = document.createElement("p");
  bidsElement.className = "text-sm font-bold text-gray-600 mt-4";
  bidsElement.textContent = `Bids: ${_count.bids}`;
  auctionDetailContainer.appendChild(bidsElement);
}

// Function to initialize fetching and rendering the auction based on URL parameter
export function initSingleAuctionPage() {
  // Get the auction ID from the URL query parameters
  const urlSearch = new URLSearchParams(window.location.search);
  const auctionId = urlSearch.get("post");

  if (auctionId) {
    // Fetch and render the auction based on the ID
    fetchAndRenderSingleAuction(auctionId);
  } else {
    console.error("Auction ID is missing in the URL.");
  }
}

// Call the init function when the page loads
document.addEventListener("DOMContentLoaded", initSingleAuctionPage);
