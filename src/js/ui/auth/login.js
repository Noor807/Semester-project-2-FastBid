/**
 * This function should pass data to the login function in api/auth and handle the response
 */

import { login } from "../../api/auth/login";

export async function onLogin(event) {
  event.preventDefault();
  const email = event.target.email.value;
  const password = event.target.password.value;

  try {
    const data = await login({
      email,
      password,
    });
    alert("login successfully");

    window.location.href = "/";
  } catch (error) {
    console.error("Login failed:", error);
    alert("Login failed. Please check your credentials and try again.");
  }
}
