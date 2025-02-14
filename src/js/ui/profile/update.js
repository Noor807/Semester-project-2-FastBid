// profile-update.js

import { updateProfileAPI } from "../../api/profile/update";

// User Handler Function for Form Submission
 export async function handleProfileFormSubmission(event) {
  event.preventDefault(); // Prevent default form submission
console.log('update profile');

  
  const avatarUrl = document.getElementById('avatar').value;
  const userName = JSON.parse(localStorage.getItem('adminUser')); // Replace this with the actual user name
  const token = localStorage.getItem('token')
  // Validate the inputs
  if ( !avatarUrl ) {
    alert('Please fill out all fields before submitting.');
    return;
  }

  // Call the API handler function to update the profile
  updateProfileAPI(userName.name, avatarUrl, token)
    .then(updatedData => {
      if (updatedData) {
        alert('Profile updated successfully!');
        // Optionally update the UI with the new profile info
        // e.g., update displayed, avatar, and banner on the page
      }
    });
}


