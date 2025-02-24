import { onLogout } from "../auth/logout.mjs";

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