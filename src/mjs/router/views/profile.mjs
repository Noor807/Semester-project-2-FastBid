import { onLogout } from "../../ui/auth/logout";
import { fetchAndDisplayMyBids } from "../../ui/profile/myBids";
import { fetchAndDisplayMyList } from "../../ui/profile/myList";
import { fetchAndDisplayMyWins } from "../../ui/profile/myWin";
import { handleProfileFormSubmission } from "../../ui/profile/update";
import { setupHamburgerMenu } from "../../utilities/hamburgerMenu.mjs";
import { populateProfile } from "../../utilities/populateProfile";

/**
 * Initializes the profile page by setting up necessary UI components,
 * fetching user-related data, and binding event listeners.
 */
function initializeProfilePage() {
  try {
    setupHamburgerMenu();
    populateProfile();

    fetchAndDisplayMyWins();
    fetchAndDisplayMyList();
    fetchAndDisplayMyBids();

    document
      .getElementById("profileUpdate")
      .addEventListener("submit", handleProfileFormSubmission);

    document.getElementById("logout-Btn").addEventListener("click", onLogout);
  } catch (error) {
    console.error("Error initializing profile page:", error);
  }
}

initializeProfilePage();
