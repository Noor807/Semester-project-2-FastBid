/**
 * Handles the profile form submission, validates the inputs, and updates the user profile via API.
 * Displays success or error messages based on the result.
 *
 * @param {Event} event - The form submission event.
 * @returns {Promise<void>}
 */

import { updateProfileAPI } from "../../api/profile/update";
import { toastMessage } from "../../utilities/toastMsg.mjs";

export async function handleProfileFormSubmission(event) {
  event.preventDefault();

  const avatarUrl = document.getElementById("profileAvatar").value;
  const userName = JSON.parse(localStorage.getItem("adminUser"));

  if (!avatarUrl) {
    toastMessage("Please fill out the required field.", "alert");
    return;
  }

  try {
    const updatedData = await updateProfileAPI(userName.name, avatarUrl);

    if (updatedData) {
      toastMessage("Profile updated successfully!", "success");
    }
  } catch (error) {
    console.error("Error updating profile:", error);
    toastMessage("Failed to update profile.", "error");
  }
}
