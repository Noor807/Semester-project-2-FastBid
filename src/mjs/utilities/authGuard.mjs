/**
 * Redirects the user to the login page if they are not authenticated.
 * Checks for the presence of a `token` in localStorage as the authentication indicator.
 */

export function authGuard() {
  if (!localStorage.token) {
    alert("You must be logged in to view this page");
    window.location.href = "/auth/login/";
  }
}
