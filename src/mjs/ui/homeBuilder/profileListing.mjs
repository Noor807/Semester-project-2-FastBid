import { getHighestBidValue } from "../../utilities/higherBider.mjs";

export async function generateAuctionListing(dataArray) {
  const auctionContainer = document.getElementById("auctionContainer");

  auctionContainer.innerHTML = "";

  dataArray.forEach((item) => {
    const section = document.createElement("section");
    section.className = "flex flex-col w-full bg-gray-300 border-2 border-gray-400 p-4 ";

    const title = document.createElement("h3");
    title.className = "font-bold";
    title.textContent = item.title;

    const itemDiv = document.createElement("div");
    itemDiv.className = "flex flex-col  sm:flex-row gap-2 relative w-full";

    const img = document.createElement("img");
    img.className = "w-20 h-20";
    img.src = item.media[0]?.url || "";
    img.alt = item.media[0]?.alt || "Item Image";

    const { highestBid } = getHighestBidValue(item);

    const textDiv = document.createElement("div");
    textDiv.className = "flex flex-col gap-2";

    const description = document.createElement("p");
    description.textContent = item.description;

    const price = document.createElement("p");
    price.className = "font-semibold text-blue-900 ";
    price.textContent = `Price: $${highestBid}`;

    textDiv.appendChild(description);
    textDiv.appendChild(price);

    const button = document.createElement("button");
    button.type = "button";
    button.textContent = "View auction";
    button.className =
      " static md:absolute cursor-pointer hover:bg-blue-600  md:right-8 md:top-1/2 md:-translate-y-1/2 bg-blue-gray w-fit p-1 m-auto font-semibold  text-white border-2";
    button.addEventListener("click", () => {
      window.location.href = `/post/index.html?singleList=${item.id}`;
    });

    itemDiv.appendChild(img);
    itemDiv.appendChild(textDiv);
    itemDiv.appendChild(button);

    section.appendChild(title);
    section.appendChild(itemDiv);

    auctionContainer.appendChild(section);
  });
}
