import { login } from "../../api/auth/login.mjs";

export async function onLogin(event) {
  event.preventDefault();

  const email = event.target.email.value;
  const password = event.target.password.value;

  try {
    await login({ email, password });
    sessionStorage.setItem("loggedIn", "true");
    window.location.href = "/"; // redirect after successful login
  } catch (error) {
    console.error("Login failed:", error);
    alert("Login failed. Please check your credentials.");
  }
}
