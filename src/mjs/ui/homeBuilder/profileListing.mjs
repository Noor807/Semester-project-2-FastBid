import { getHighestBidValue } from "../../utilities/higherBider";

// Function to generate HTML and export it
export async function generateAuctionListing(auctions) {
  const container = document.getElementById('auctionContainer'); // Container to hold all auction listings
  container.innerHTML = ''; // Clear the container

  // Loop through the array of auctions and generate HTML for each
  auctions.forEach((auction) => {
    // Create the section element
    const section = document.createElement('section');
    section.classList.add(
      'flex', 
      'flex-col', 
      'sm:flex-row',  // Make it row on small screens
      'border', 
      'border-blue-gray', 
      'gap-2', 
      'mb-2',
      'sm:gap-1', // Larger gap for small screens
      'lg:gap-8',
      'lg:flex-row',  // For large screens, keep it row
      'lg:gap-8' // Even bigger gap on large screens
    );

    // Create the first div (image and title)
    const div1 = document.createElement('div');
    div1.classList.add('flex', 'flex-col', 'items-center', 'ml-3', 'sm:ml-2', 'lg:ml-8');
    const title = document.createElement('h3');
    title.classList.add('font-bold', 'mb-2','sm:text-xs',  'lg:text-sm');
    title.innerText = auction.title; // Auction title

    const img = document.createElement('img');
    img.classList.add(
      'w-20', 'h-20', 'object-cover', 'rounded-lg', 
      'sm:w-40', 'sm:h-40', 'lg:w-48', 'lg:h-48', 
      'mb-3', 'sm:mr-4'
    );
    img.src = auction.media[0]?.url || ""; // Fallback if no media is available
    img.alt = auction.media[0]?.alt || "Image";
    div1.appendChild(title);
    div1.appendChild(img);

    // Create the second div (description and price)
    const { highestBid } = getHighestBidValue(auction);
    const div2 = document.createElement('div');
    div2.classList.add(
      'flex', 'flex-col', 'items-center', 'justify-center', 
      'lg:items-end', 'ml-3', 'mt-2', // Adjusted margin for better spacing
      'sm:mt-2', 'lg:mt-10'
    );
    const description = document.createElement('p');
    description.classList.add('text-gray-700', 'mb-1');
    description.innerText = auction.description; // Auction description

    const price = document.createElement('p');
    price.classList.add('font-bold',  'lg:text-sm');
    price.innerText = `Price: $${highestBid || "0.00"}`;
    div2.appendChild(description);
    div2.appendChild(price);

    // Create the third div (button)
    const div3 = document.createElement('div');
    div3.classList.add(
      'mt-2', 'ml-3', 'mb-2', 
      'sm:mt-2', 'lg:mt-8','flex', 'items-center', 'justify-center', 'sm:ml-3', 'lg:ml-8'
    );
    const button = document.createElement('button');
    button.classList.add(
      'bg-blue-gray', 'border-2', 'border-white', 'text-white', 
      'px-2', 'py-1', 'rounded', 'hover:bg-blue-400', 
      'transition', 'border', 'border-white', 
       'lg:text-xs'
    );

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
