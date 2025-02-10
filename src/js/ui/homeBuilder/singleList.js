import { API_AUCTION } from "../../api/constants";
import { fetchSingleAuction } from "../../api/list/singleListRead";

fetchSingleAuction

// Function to fetch auction details and render them on the page
export async function fetchAndRenderSingleAuction(auctionId) {
    try {
      // Fetch auction listing by ID from the API
      const response = await fetch(`${API_AUCTION}/${auctionId}`);
      
      // Check if the response is ok (status 200-299)
      if (!response.ok) {
        throw new Error(`Failed to fetch auction with ID: ${auctionId}`);
      }
  
      // Parse the JSON response to get the auction data
      const auctionResponse = await response.json();
  
      // Check if the response structure matches the expected format
      if (!auctionResponse.data) {
        throw new Error(`Invalid response format for auction with ID: ${auctionId}`);
      }
  
      // Call render function to display the single auction
      renderSingleAuction(auctionResponse.data);
    } catch (error) {
      console.error("Error fetching single auction:", error);
    }
  }
  
  // This function is responsible for rendering the auction details into the DOM
  export function renderSingleAuction(auction) {
    const auctionDetailContainer = document.querySelector("#AuctionDetailContainer");
  
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
    auctionDetailContainer.innerHTML = '';
  
    // Create image element for auction if media exists
    const img = document.createElement("img");
    if (media && media.length > 0) {
      img.src = media[0].url || "";
      img.alt = media[0].alt || "No description";
    }
    img.className = "w-full h-64 object-cover rounded-lg mb-6";
  
    // Create auction details container
    const contentDiv = document.createElement("div");
  
    // Create title element for auction
    const titleElement = document.createElement("h2");
    titleElement.className = "text-2xl font-semibold text-gray-800 mb-4";
    titleElement.textContent = title;
    contentDiv.appendChild(titleElement);
  
    // Create description element for auction
    const descriptionElement = document.createElement("p");
    descriptionElement.className = "text-md text-gray-800 mb-4";
    descriptionElement.textContent = description;
    contentDiv.appendChild(descriptionElement);
  
    // Create seller element for auction (you can modify this according to your data)
    const sellerElement = document.createElement("p");
    sellerElement.className = "text-lg text-gray-600 mb-2";
    sellerElement.textContent = `Seller: ${seller.name}`; // Update with actual seller info if available
    contentDiv.appendChild(sellerElement);
  
    // Create created date element for auction
    const createdElement = document.createElement("p");
    createdElement.className = "text-sm text-gray-500 mb-2";
    createdElement.textContent = `Created on: ${created ? created.slice(0, 10) : "Unknown Date"}`;
    contentDiv.appendChild(createdElement);
  
    // Create tags element for auction
    const tagsElement = document.createElement("p");
    tagsElement.className = "text-sm text-gray-700 mb-4";
    tagsElement.textContent = tags.length > 0 ? `Tags: ${tags.join(", ")}` : "No tags available";
    contentDiv.appendChild(tagsElement);
  
    // Create endsAt date element for auction
    const endsAtElement = document.createElement("p");
    endsAtElement.className = "text-sm text-gray-500 mb-2";
    endsAtElement.textContent = `Ends at: ${endsAt ? endsAt.slice(0, 10) : "Unknown Date"}`;
    contentDiv.appendChild(endsAtElement);
  
    // Append image and content to the container
    auctionDetailContainer.appendChild(img);
    auctionDetailContainer.appendChild(contentDiv);
  
    // Optionally, you can also display the number of bids
    const bidsElement = document.createElement("p");
    bidsElement.className = "text-sm text-gray-600 mb-4";
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
  