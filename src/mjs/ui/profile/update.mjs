import { updateProfileAPI } from "../../api/profile/update";
import { toastMessage } from "../../utilities/toastMsg.mjs";

export async function handleProfileFormSubmission(event) {
  event.preventDefault();

  const avatarUrl = document.getElementById("profileAvatar").value;
  const userName = JSON.parse(localStorage.getItem("adminUser"));
  

  if (!avatarUrl) {
    toastMessage("Please fill out required feild.", "alert");
    return;
  }

  updateProfileAPI(userName.name, avatarUrl).then((updatedData) => {
    if (updatedData) {
      toastMessage("Profile updated successfully!", "success");
    }
  });
}
