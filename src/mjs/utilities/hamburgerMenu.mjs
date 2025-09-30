// Setup the hamburger menu toggle
export function setupHamburgerMenu() {
  const hamburgerBtn = document.getElementById("hamburger-btn");
  const navbarLinks = document.getElementById("navbar-links");

  hamburgerBtn.addEventListener("click", () => {
    navbarLinks.classList.toggle("hidden");
    navbarLinks.classList.toggle("flex");
  });
}
