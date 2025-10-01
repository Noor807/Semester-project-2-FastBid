import { fetchAuctionProfile } from "../profile/auctionProfile.mjs";
import { API_AUTH_LOGIN, API_KEY } from "../constants.mjs";

/**
 * Logs in a user and stores token + user info.
 *
 * @param {Object} param0
 * @param {string} param0.email
 * @param {string} param0.password
 * @returns {Promise<Object>} The login response data
 */
export async function login({ email, password }) {
  try {
    // 1️⃣ Send login request
    const response = await fetch(API_AUTH_LOGIN, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Noroff-API-Key": API_KEY, // include API key if required
      },
      body: JSON.stringify({ email, password }),
    });

    // 2️⃣ Parse response JSON safely
    let data;
    try {
      data = await response.json();
    } catch {
      throw new Error("Invalid JSON response from login endpoint");
    }

    console.log("Login response:", data);

    // 3️⃣ Check if login failed
    if (!response.ok) {
      const msg =
        data.message ||
        (data.errors && data.errors[0]?.message) ||
        "Login failed";
      throw new Error(`Login failed: ${msg}`);
    }

    // 4️⃣ Get access token
    const token = data.data?.accessToken || data.accessToken;
    if (!token) throw new Error("No access token received");

    // 5️⃣ Save token & user info
    localStorage.setItem("token", token);
    localStorage.setItem("adminUser", JSON.stringify(data.data || data));

    // 6️⃣ Fetch auction profile (protected route)
    const profileName = data.data?.name || data.name;
    if (profileName) {
      try {
        await fetchAuctionProfile(profileName);
      } catch (err) {
        console.error("Failed to fetch profile after login:", err.message);
        // Optional: decide if you want to continue or throw
      }
    }

    return data;
  } catch (error) {
    console.error("Error during login process:", error.message);
    throw error;
  }
}
