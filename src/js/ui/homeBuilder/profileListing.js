import { getHighestBidValue } from "../../utilities/higherBider";

// Function to generate HTML and export it
export async function generateAuctionListing(auctions) {
  const container = document.getElementById('auctionContainer'); // Container to hold all auction listings
  container.innerHTML = ''; // Clear the container

  // Loop through the array of auctions and generate HTML for each
  auctions.forEach((auction) => {
    // Create the section element
    const section = document.createElement('section');
    section.classList.add('flex', 'flex-col', 'sm:flex-col','border', 'border-blue-gray', 'md:flex-col', 'lg:flex-col', 'gap-5', 'mb-8');

  
    // Create the first div (image and title)
    const div1 = document.createElement('div');
    div1.classList.add('flex', 'flex-col', 'items-center', 'sm:items-start', 'ml-3');
    const title = document.createElement('h3');
    title.classList.add( 'font-bold', 'mb-2', 'text-xs');
    title.innerText = auction.title; // Auction title

    const img = document.createElement('img');
    img.classList.add('w-20', 'h-20', 'object-cover', 'sm:w-40', 'sm:h-40', 'rounded-lg', 'sm:mr-4');
    img.src = auction.media[0]?.url || ""; // Fallback if no media is available
    img.alt = auction.media[0]?.alt || "Image";
    div1.appendChild(title);
    div1.appendChild(img);

  
    // Create the second div (description and price)
    const { highestBid } = getHighestBidValue(auction);
    const div2 = document.createElement('div');
    div2.classList.add('flex', 'flex-col', 'sm:justify-start', 'sm:items-start', 'lg:flex-end','ml-3');
    const description = document.createElement('p');
    description.classList.add('text-gray-700', 'mb-1');
    description.innerText = auction.description; // Auction description
    const price = document.createElement('p');
    price.classList.add('font-semibold' ,'text-xs');
    price.innerText = `Price: $${highestBid || "0.00"}`;
    div2.appendChild(description);
    div2.appendChild(price);

    // Create the third div (button)
    const div3 = document.createElement('div');
    div3.classList.add('lg:items-start' , 'sm:items-start', 'mt-1','ml-3');
    const button = document.createElement('button');
    button.classList.add('bg-blue-500', 'text-white', 'px-5', 'py-2', 'rounded', 'hover:bg-blue-600', 'transition', 'border', 'border-white');

    button.innerText = 'View Auction';
    // Attach click event to the button
    button.addEventListener('click', () => {
      window.location.href = `/post/index.html?singleList=${auction.id}`; // Redirect to auction page
    });
    div3.appendChild(button);

    // Append the three divs to the section
    section.appendChild(div1);
    section.appendChild(div2);
    section.appendChild(div3);

    // Append the section to the container
    container.appendChild(section);
  });
}
