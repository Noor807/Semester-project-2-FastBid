// Function to populate the form with auction data
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
