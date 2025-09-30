import { deleteAuction } from "../../api/list/delete.mjs";
import { toastMessage } from "../../utilities/toastMsg.mjs";

/**
 * Handles the deletion of a post by calling the deleteAuction API and handling the response.
 * Prompts the user for confirmation before proceeding with the deletion.
 *
 * @param {Event} event - The event triggered when the delete button is clicked.
 * @returns {Promise<void>}
 */
export async function onDeletePost(event) {
  event.preventDefault();

  const button = event.target;
  const id = button.dataset.id;

  if (!id) {
    console.error("listID not found.");
    toastMessage("Error: list ID is missing.", "error");
    return;
  }

  const confirmed = confirm("Are you sure you want to delete this list?");
  if (!confirmed) return;

  try {
    const result = await deleteAuction(id);

    if (result) {
      sessionStorage.setItem("deleteList", true);
      window.location.href = "/";
    } else {
      console.error("Failed to delete list:", result?.error || "Unknown error");
      toastMessage("Error: Could not delete the list.", "error");
    }
  } catch (error) {
    console.error("Unexpected error:", error);
    toastMessage("Error: Could not delete the list.", "error");
  }
}
