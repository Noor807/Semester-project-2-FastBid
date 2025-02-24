import { onLogout } from "../auth/logout.mjs";

// Function to update the admin button based on login state
export function updateAdminButton() {
  const adminBtn = document.querySelector("#admin-btn");
  const token = localStorage.getItem("token");

  if (!adminBtn) return;

  // Remove existing event listeners by replacing the button
  adminBtn.replaceWith(adminBtn.cloneNode(true));
  const newBtn = document.querySelector("#admin-btn"); // Re-select button

  if (token) {
    newBtn.textContent = "Logout";
    newBtn.addEventListener("click", onLogout);
  } else {
    newBtn.textContent = "Login";
    newBtn.addEventListener("click", () => {
      window.location.href = "/auth/login/";
    });
  }
}

// Function to update the navigation links based on login state
export function updateNavigation() {
  const token = localStorage.getItem("token");
  const profileLink = document.getElementById("profile-link");
  const createPostLink = document.getElementById("create-post-link");

  // Check if the elements exist before manipulating them
  if (profileLink) {
    if (token) {
      profileLink.classList.remove("hidden");
    } else {
      profileLink.classList.add("hidden");
    }
  }

  if (createPostLink) {
    if (token) {
      createPostLink.classList.remove("hidden");
    } else {
      createPostLink.classList.add("hidden");
    }
  }
}


// Call both functions to update the page when it's loaded
updateAdminButton();
updateNavigation();
