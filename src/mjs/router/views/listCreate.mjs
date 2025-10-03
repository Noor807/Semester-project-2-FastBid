import { onLogout } from "../../ui/auth/logout";
import { handleCreateListFormSubmit} from "../../ui/list/create.mjs";
import { authGuard } from "../../utilities/authGuard";
import { setupHamburgerMenu } from "../../utilities/hamburgerMenu.mjs";

/**
 * Initializes all necessary UI functions and event listeners.
 */
function initializeUI() {
  setupHamburgerMenu();
  authGuard(); // redirect if not logged in

  const form = document.getElementById("new-list-form");
  if (form) {
    form.addEventListener("submit", handleCreateListFormSubmit);
  }

  const logoutBtn = document.getElementById("logout-Btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", onLogout);
  }
}

initializeUI();
