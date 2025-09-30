/**
 * Populates the admin profile section with user data from localStorage.
 *
 * Retrieves `adminUser` and `credit` from localStorage and updates the DOM elements:
 * - `#avatar` for the user's avatar image
 * - `#profileName` for the user's name
 * - `#wallet` for the user's credit balance
 *
 * @async
 * @returns {Promise<void>}
 */
export async function populateProfile() {
  const adminUser = JSON.parse(localStorage.getItem("adminUser"));
  const credit = localStorage.getItem("credit");

  if (!adminUser) {
    console.error("Admin user data not found in localStorage.");
    return;
  }

  document.getElementById("avatar").src = adminUser.avatar.url;
  document.getElementById("profileName").textContent = adminUser.name;
  document.getElementById("wallet").textContent = `${credit}$`;
}
