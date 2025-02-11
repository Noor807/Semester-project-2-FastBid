// routerView.js
import { setLogoutListener } from "../../ui/global/logout";
import { handleCreateListFormSubmit } from "../../ui/list/create"; // Import UI function to handle form submission
import { authGuard } from "../../utilities/authGuard";
setLogoutListener;
authGuard;

const form = document.getElementById("new-list-form"); // Assuming the form has the id "new-list-form"

// Bind the form submit event to the handler function
form.addEventListener("submit", handleCreateListFormSubmit);

const hamburgerBtn = document.getElementById("hamburger-btn");
const navbarLinks = document.getElementById("navbar-links");

hamburgerBtn.addEventListener("click", () => {
  navbarLinks.classList.toggle("hidden");
});
