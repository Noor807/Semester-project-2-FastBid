/**
 * Populates the edit auction form with existing auction data.
 *
 * @param {Object} data - The auction data to populate the form with.
 * @param {string} data.title - The title of the auction.
 * @param {string} data.description - The description of the auction.
 * @param {Array<string>} [data.tags] - An array of tags for the auction.
 * @param {Array<{url: string, alt: string}>} [data.media] - An array of media objects for the auction.
 */
export function populateFormWithAuctionData(data) {
  const form = document.getElementById("edit-auction-form");

  if (!form) {
    console.error("Form not found!");
    return;
  }

  document.forms.editForm.title.value = data.title;
  document.forms.editForm.description.value = data.description;
  document.forms.editForm.tags.value = data.tags ? data.tags.join(", ") : "";
  document.forms.editForm.mediaUrl.value = data.media ? data.media[0].url : "";
  document.forms.editForm.mediaAlt.value = data.media ? data.media[0].alt : "";
}
