/**
//  * Logs in a user with the provided email and password.
//  *
//  * @param {Object} data - The login data.
//  * @param {string} data.email - The user's email address.
//  * @param {string} data.password - The user's password.
//  * @returns {Promise<Object>} A promise that resolves to the user's login response.
//  * @throws {Error} Error if the login fails.
//  */

import { API_AUTH_LOGIN } from "../constants";
import { fetchAuctionProfile } from "../profile/auctionProfile.mjs";

export async function login({ email, password }) {
  try {
    const response = await fetch(API_AUTH_LOGIN, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Login failed");
    }

    const data = await response.json();

    localStorage.setItem("token", data.data.accessToken);
    const adminUser = data.data;
    localStorage.setItem("adminUser", JSON.stringify(adminUser));
    await fetchAuctionProfile(data.data.name, data.data.accessToken);
    return data;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
}
