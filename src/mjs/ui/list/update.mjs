import { editAuction } from "../../api/list/update";
import { toastMessage } from "../../utilities/toastMsg.mjs";

// Handle form submission for editing an auction listing
export async function handleEditAuctionFormSubmit(e, auctionId) {
  e.preventDefault(); // Prevent form from submitting normally

  // Get form values
  const title = e.target.title.value.trim();
  const description = e.target.description.value.trim();
  const mediaUrl = e.target.mediaUrl.value.trim();
  const mediaAlt = e.target.mediaAlt.value.trim();
  const selectedTags = e.target.tags.value
    ? e.target.tags.value.split(",").map((tag) => tag.trim())
    : [];

  // Validate required fields
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

  // Get the token from localStorage
  const token = localStorage.getItem("token");
  if (!token) {
    toastMessage("You must be logged in to edit an auction.");
    return;
  }

  // Prepare the updated auction data
  const updatedAuction = {
    title: title,
    description: description,
    tags: selectedTags,
    media: mediaUrl ? [{ url: mediaUrl, alt: mediaAlt }] : null,
  };

  try {
    // Call the editAuction function to update the auction listing
    const result = await editAuction(auctionId, updatedAuction, token);

    // Notify the user of the successful update
   sessionStorage.setItem("updatedSuccess",'true');

    // Optionally, redirect after successful update
    window.location.href = `/post/index.html?singleList=${auctionId}`; // Redirect to the updated auction page
  } catch (error) {
    console.error("Error:", error);
    toastMessage("Failed to update auction listing: " + error.message);
  }
}
