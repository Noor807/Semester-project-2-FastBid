/**
 * This function should log the user out by removing appropriate user data from the browser.
 */

export function onLogout() {

  localStorage.removeItem("token");
  localStorage.removeItem("apiKey");
  localStorage.removeItem("adminUser");

  window.location.href = "/auth/login/";
}
