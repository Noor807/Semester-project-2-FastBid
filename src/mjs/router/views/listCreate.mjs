import { onLogout } from "../../ui/auth/logout";
import { handleCreateListFormSubmit } from "../../ui/list/create";
import { authGuard } from "../../utilities/authGuard";

onLogout;
authGuard;

const form = document.getElementById("new-list-form");

form.addEventListener("submit", handleCreateListFormSubmit);

document.getElementById("logout-Btn").addEventListener("click", onLogout);

const hamburgerBtn = document.getElementById("hamburger-btn");
const navbarLinks = document.getElementById("navbar-links");

hamburgerBtn.addEventListener("click", () => {
  navbarLinks.classList.toggle("hidden");
});
