import { onLogout } from "../../ui/auth/logout";
import { fetchAndDisplayMyBids } from "../../ui/profile/myBids";
import { fetchAndDisplayMyList } from "../../ui/profile/myList";
import { fetchAndDisplayMyWins } from "../../ui/profile/myWin";
import { handleProfileFormSubmission } from "../../ui/profile/update";
import { populateProfile } from "../../utilities/populateProfile";
fetchAndDisplayMyWins()
fetchAndDisplayMyList()
fetchAndDisplayMyBids()

// Add event listener to the form submit button
document.getElementById('profileUpdate').addEventListener('submit', handleProfileFormSubmission);
populateProfile()


document.getElementById("logout-Btn").addEventListener("click", onLogout);

const hamburgerBtn = document.getElementById("hamburger-btn");
const navbarLinks = document.getElementById("navbar-links");

hamburgerBtn.addEventListener("click", () => {
  navbarLinks.classList.toggle("hidden");
});