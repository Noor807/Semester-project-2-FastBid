import { onLogout } from "../auth/logout.mjs";

/**
 * Updates the Admin button based on the authentication state of the user.
 *
 * If a token is found in localStorage, the button text will be set to "Logout"
 * and a logout event listener will be attached. If no token is found, the button
 * text will be set to "Login" and a redirect to the login page will occur when clicked.
 */
export function updateAdminButton() {
  const adminBtn = document.querySelector("#admin-btn");
  const token = localStorage.getItem("token");

  if (!adminBtn) return;

  adminBtn.replaceWith(adminBtn.cloneNode(true));
  const newBtn = document.querySelector("#admin-btn");

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

/**
 * Updates the visibility of navigation links based on the authentication state.
 *
 * If a token is found in localStorage, the profile and create post links will be visible.
 * If no token is found, they will be hidden.
 */
export function updateNavigation() {
  const token = localStorage.getItem("token");
  const profileLink = document.getElementById("profile-link");
  const createPostLink = document.getElementById("create-post-link");

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

updateAdminButton();
updateNavigation();
