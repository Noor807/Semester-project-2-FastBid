/**
 * Generates and renders auction bid elements for each auction in the `auctions` array.
 * Displays auction details including title, image, and bid amount.
 *
 * @param {Array<Object>} auctions - List of auctions with bid details.
 * @param {string} auctions[].listing.title - Title of the auction listing.
 * @param {Object} auctions[].listing.media - Media object containing image details.
 * @param {string} auctions[].listing.media[0].url - URL of the auction's image.
 * @param {string} auctions[].listing.media[0].alt - Alt text for the auction's image.
 * @param {number} auctions[].amount - Bid amount for the auction.
 */
export async function generateAuctionBids(auctions) {
  const container = document.getElementById("myBids");

  container.innerHTML = "";

  auctions.forEach((auction) => {
    const outerDiv = document.createElement("div");
    outerDiv.classList.add(
      "flex",
      "flex-col",
      "sm:flex-row",
      "justify-between",
      "space-y-4",
      "sm:space-y-0",
      "p-4",
      "bg-blue-100",
      "border",
      "border-gray-300",
      "rounded-lg",
      "shadow-lg"
    );

    const innerDiv1 = document.createElement("div");
    innerDiv1.classList.add(
      "flex",
      "flex-col",
      "sm:flex-col",
      "justify-center",
      "items-center",
      "sm:items-start",
      "space-y-2",
      "sm:space-y-0"
    );

    const title = document.createElement("h3");
    title.textContent = auction.listing.title || "Untitled Auction";
    title.classList.add("font-semibold", "text-xs");

    const img = document.createElement("img");
    img.src = auction.listing.media[0]?.url || "";
    img.alt = auction.listing.media[0]?.alt || "Image";
    img.classList.add("w-20", "h-20", "object-cover", "rounded-lg", "sm:mr-4");

    innerDiv1.appendChild(title);
    innerDiv1.appendChild(img);

    const innerDiv2 = document.createElement("div");
    innerDiv2.classList.add(
      "flex",
      "flex-row",
      "items-center",
      "sm:items-start",
      "space-y-2"
    );

    const bid = document.createElement("p");
    bid.textContent = `Bid: $${auction.amount || "0.00"}`;
    bid.classList.add("text-sm", "font-semibold", "text-blue-800");

    innerDiv2.appendChild(bid);

    outerDiv.appendChild(innerDiv1);
    outerDiv.appendChild(innerDiv2);

    container.appendChild(outerDiv);
  });
}
