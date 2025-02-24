import { getHighestBidValue } from "../../utilities/higherBider";

export async function generateWinningAuctions(winningAuctions) {
  const container = document.getElementById("winList");

  container.innerHTML = "";

  if (winningAuctions.length === 0) {
    container.className =
      "w-full h-20 bg-red-500 text-white flex justify-center items-center";
    container.textContent = "Sorry you haven’t won anything yet";
    return;
  }

  winningAuctions.forEach((auction) => {
    const outerDiv = document.createElement("div");
    outerDiv.classList.add(
      "flex",
      "flex-col",
      "sm:flex-col",
      "lg:flex-col",
      "mb-8",
      "border",
      "rounded-lg",
      "shadow-md",
      "bg-teal-100",
      "p-4",
      "space-y-4",
      "sm:space-y-0",
      "sm:space-x-6",
      "sm:items-center"
    );

    const innerDiv1 = document.createElement("div");
    innerDiv1.classList.add(
      "flex",
      "flex-col",
      "sm:flex-col",
      "sm:items-center",
      "sm:space-x-4",
      "w-full"
    );

    const title = document.createElement("h3");
    title.classList.add("font-bold", "text-gray-800");
    title.innerText = auction.title;

    const img = document.createElement("img");
    img.src = auction.media[0]?.url || "";
    img.alt = auction.media[0]?.alt || "Image";
    img.classList.add(
      "w-32",
      "h-32",
      "sm:w-32",
      "sm:h-32",
      "rounded-lg",
      "object-cover",
      "mb-4",
      "sm:mb-0"
    );

    innerDiv1.appendChild(title);
    innerDiv1.appendChild(img);

    const { highestBid } = getHighestBidValue(auction);
    const innerDiv2 = document.createElement("div");
    innerDiv2.classList.add(
      "text-gray-700",
      "font-medium",
      "sm:ml-auto",
      "mt-4",
      "sm:mt-0"
    );
    const wonPrice = document.createElement("p");
    wonPrice.classList.add("text-sm", "font-semibold", "text-blue-700");
    wonPrice.textContent = `Won for: $${highestBid}`;

    innerDiv2.appendChild(wonPrice);

    outerDiv.appendChild(innerDiv1);
    outerDiv.appendChild(innerDiv2);

    container.appendChild(outerDiv);
  });
}
