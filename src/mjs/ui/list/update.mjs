import { editAuction } from "../../api/list/update";
import { toastMessage } from "../../utilities/toastMsg.mjs";

export async function handleEditAuctionFormSubmit(e, auctionId) {
  e.preventDefault();

  const title = e.target.title.value.trim();
  const description = e.target.description.value.trim();
  const mediaUrl = e.target.mediaUrl.value.trim();
  const mediaAlt = e.target.mediaAlt.value.trim();
  const selectedTags = e.target.tags.value
    ? e.target.tags.value.split(",").map((tag) => tag.trim())
    : [];

  if (
    !title &&
    !description &&
    !mediaUrl &&
    !mediaAlt &&
    selectedTags.length === 0
  ) {
    toastMessage("At least one of Title, Description, or Media is required.");
    return;
  }

  const token = localStorage.getItem("token");
  if (!token) {
    toastMessage("You must be logged in to edit an auction.");
    return;
  }

  const updatedAuction = {
    title: title,
    description: description,
    tags: selectedTags,
    media: mediaUrl ? [{ url: mediaUrl, alt: mediaAlt }] : null,
  };

  try {
    const result = await editAuction(auctionId, updatedAuction, token);

    sessionStorage.setItem("updatedSuccess", "true");

    window.location.href = `/post/index.html?singleList=${auctionId}`;
  } catch (error) {
    console.error("Error:", error);
    toastMessage("Failed to update auction listing: " + error.message);
  }
}
