/**
 * Passes data to the createPost function in api/post and handles the response
 */

import { deleteAuction } from "../../api/list/delete.mjs";
import { toastMessage } from "../../utilities/toastMsg.mjs";

export async function onDeletePost(event) {
  event.preventDefault();

  const button = event.target;
  const id = button.dataset.id;
  const token = localStorage.getItem("token");
  if (!id) {
    console.error("listID not found.");
    return;
  }

  const confirmation = confirm("Are you sure you want to delete this list?");
  if (!confirmation) return;

  try {
    const result = await deleteAuction(id, token);

    if (result) {
      sessionStorage.setItem("deleteList", true);
      window.location.href = "/";
    } else {
      console.error("Failed to delete list:", result.error);
      toastMessage("Error: Could not delete the list.", "error");
    }
  } catch (error) {
    console.error("Unexpected error:", error);
    toastMessage("Error: Could not delete the list.", "error");
  }
}
