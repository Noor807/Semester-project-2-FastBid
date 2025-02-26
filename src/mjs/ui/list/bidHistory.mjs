export async function createBidHistoryModal(bids) {
  const modal = document.createElement("div");
  modal.id = "bidHistoryModal";
  modal.className =
    "fixed inset-0 bg-black bg-opacity-50 mt-15 flex justify-center items-center hidden";

  const modalContent = document.createElement("div");
  modalContent.className = "bg-white p-4 rounded-lg w-96 shadow-lg";

  const closeButton = document.createElement("button");
  closeButton.innerText = "Close";
  closeButton.className = "text-red-500 font-bold float-right";
  closeButton.onclick = () => (modal.style.display = "none");
  const sortList = bids.sort((a, b) => b.amount - a.amount);

  modalContent.appendChild(closeButton);

  sortList.forEach((bid) => {
    const bidContainer = document.createElement("div");
    bidContainer.className =
      "flex justify-between items-center w-full border-b py-2 md:py-4";

    const userInfo = document.createElement("div");
    userInfo.className = "flex items-center space-x-4";

    const img = document.createElement("img");
    img.className = "w-16 h-16 rounded-full md:w-20 md:h-20";
    img.src = bid.bidder.avatar.url || "default-avatar.png";
    img.alt = `${bid.bidder.name}'s avatar`;

    const username = document.createElement("p");
    username.className = "text-sm md:text-base font-semibold";
    username.innerText = bid.bidder.name;

    userInfo.appendChild(img);
    userInfo.appendChild(username);

    const bidAmount = document.createElement("p");
    bidAmount.className = "text-sm md:text-base";
    bidAmount.innerHTML = `Bid amount: <span class="font-bold">${bid.amount}</span>`;

    bidContainer.appendChild(userInfo);
    bidContainer.appendChild(bidAmount);

    const modalContent = document.querySelector(".modal-content");
    modalContent.className = "max-h-[400px] overflow-y-auto";

    modalContent.appendChild(bidContainer);
  });

  modal.appendChild(modalContent);
  document.body.appendChild(modal);

  document.getElementById("bidHistory").addEventListener("click", () => {
    modal.style.display = "flex";
  });
}
