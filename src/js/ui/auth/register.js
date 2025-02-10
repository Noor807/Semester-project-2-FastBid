/**
 * This function should pass data to the register function in api/auth and handle the response
 */

import { register } from "../../api/auth/register";

export async function onRegister(event) {
  event.preventDefault();
  const name = event.target.name.value;
  const email = event.target.email.value;
  const password = event.target.password.value;

  try {
    const data = await register({
      name,
      email,
      password,
    });

    const confirmAction = confirm(
      "welcome you are registered successfully.do you want to login?"
    );
    if (confirmAction) {
      window.location.href = "/auth/login/";
    }
  } catch (error) {
    console.error("Registration failed:", error);
    alert("Registration failed. Please check your details and try again.");
  }
}
