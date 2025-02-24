import { onLogout } from "../auth/logout.mjs";

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
