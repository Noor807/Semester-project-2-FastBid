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
    bidContainer.className = "flex justify-between w-full border-b py-2";

    const userInfo = document.createElement("div");

    const img = document.createElement("img");
    img.className = "w-20 h-20 rounded-e-full";
    img.src = bid.bidder.avatar.url || "default-avatar.png";
    img.alt = `${bid.bidder.name}'s avatar`;

    const username = document.createElement("p");
    username.innerText = bid.bidder.name;

    userInfo.appendChild(img);
    userInfo.appendChild(username);

    const bidAmount = document.createElement("p");
    bidAmount.innerHTML = `Bid amount: <span>${bid.amount}</span>`;

    bidContainer.appendChild(userInfo);
    bidContainer.appendChild(bidAmount);
    modalContent.appendChild(bidContainer);
  });

  modal.appendChild(modalContent);
  document.body.appendChild(modal);

  document.getElementById("bidHistory").addEventListener("click", () => {
    modal.style.display = "flex";
  });
}
