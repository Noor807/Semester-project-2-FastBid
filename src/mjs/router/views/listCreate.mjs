
import { onLogout } from "../../ui/auth/logout";
import { handleCreateListFormSubmit } from "../../ui/list/create";
import { authGuard } from "../../utilities/authGuard";
import { prepareAuthHeaders } from "../../utilities/authUtils.mjs";
import { setupHamburgerMenu } from "../../utilities/hamburgerMenu.mjs";



/**
 * Initializes all necessary UI functions and event listeners.
 */
function initializeUI() {
  setupHamburgerMenu();
  prepareAuthHeaders();
  authGuard();

  const form = document.getElementById("new-list-form");
  form.addEventListener("submit", handleCreateListFormSubmit);

  document.getElementById("logout-Btn").addEventListener("click", onLogout);
}

initializeUI();
