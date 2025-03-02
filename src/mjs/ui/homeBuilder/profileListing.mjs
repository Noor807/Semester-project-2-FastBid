import { getHighestBidValue } from "../../utilities/higherBider.mjs";

/**
 * Generates the auction listings and displays them on the page.
 *
 * @param {Array<Object>} dataArray - Array of auction items to display.
 * @param {string} dataArray[].id - Unique identifier for the auction item.
 * @param {string} dataArray[].title - Title of the auction.
 * @param {Object} dataArray[].media - Media object for the auction (usually an image).
 * @param {string} dataArray[].media[0].url - URL of the auction image.
 * @param {string} dataArray[].media[0].alt - Alt text for the auction image.
 * @param {string} dataArray[].description - Description of the auction item.
 * @param {Array} dataArray[].bids - Array of bids placed on the auction item.
 */
export async function generateAuctionListing(dataArray) {
  const auctionContainer = document.getElementById("auctionContainer");

  auctionContainer.innerHTML = "";

  const fragment = document.createDocumentFragment();

  dataArray.forEach((item) => {
    const section = document.createElement("section");
    section.className =
      "flex flex-col w-full bg-gray-200 border-2 border-gray-400 p-4";

    const title = document.createElement("h3");
    title.className = "font-bold";
    title.textContent = item.title || "Untitled Auction";

    const itemDiv = document.createElement("div");
    itemDiv.className = "flex flex-col sm:flex-row gap-2 relative w-full";

    const img = document.createElement("img");
    img.className = "w-20 h-20";
    img.src = item.media[0]?.url || "path/to/placeholder-image.jpg";
    img.alt = item.media[0]?.alt || "Item Image";
    img.loading = "lazy";

    const { highestBid } = getHighestBidValue(item);

    const textDiv = document.createElement("div");
    textDiv.className = "flex flex-col gap-2";

    const description = document.createElement("p");
    description.textContent = item.description || "No description available.";

    const price = document.createElement("p");
    price.className = "font-semibold text-blue-900";
    price.textContent = `Price: $${highestBid || "0.00"}`;

    textDiv.appendChild(description);
    textDiv.appendChild(price);

    const button = document.createElement("button");
    button.type = "button";
    button.textContent = "View auction";
    button.className =
      "static md:absolute cursor-pointer px-4 py-2 hover:bg-blue-600 md:right-8 md:top-1/2 md:-translate-y-1/2 bg-blue-gray w-fit p-2 m-auto font-semibold text-white border-2";

    button.addEventListener("click", () => {
      window.location.href = `/post/index.html?singleList=${item.id}`;
    });

    itemDiv.appendChild(img);
    itemDiv.appendChild(textDiv);
    itemDiv.appendChild(button);

    section.appendChild(title);
    section.appendChild(itemDiv);

    fragment.appendChild(section);
  });

  auctionContainer.appendChild(fragment);
}
