/**
 * Functions you attach to logout events that calls ui/auth/logout function
 */

import { onLogout } from "../auth/logout";
export function setLogoutListener() {
  const logoutButton = document.getElementById("logout-Btn");

  logoutButton.addEventListener("click", onLogout);
}
