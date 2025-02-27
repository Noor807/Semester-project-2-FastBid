import { prepareAuthHeaders } from "../../utilities/authUtils.mjs";
import { API_AUCTION_PROFILE } from "../constants.mjs";

/**
 * Updates the user profile by changing the avatar URL.
 *
 * @param {string} name - The name of the user to update the profile for.
 * @param {string} avatarUrl - The new URL of the user's avatar.
 * @returns {Promise<Object | null>} The updated profile data, or null if an error occurs.
 * @throws {Error} If there is a problem with the update request or response.
 */
export async function updateProfileAPI(name, avatarUrl) {
  if (!name || !avatarUrl) {
    throw new Error(
      "Both 'name' and 'avatarUrl' are required to update the profile."
    );
  }

  const url = `${API_AUCTION_PROFILE}/${name}`;
  const requestBody = {
    avatar: {
      url: avatarUrl,
      alt: "User avatar",
    },
  };

  try {
    const headers = prepareAuthHeaders();

    const response = await fetch(url, {
      method: "PUT",
      headers: headers,
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage = errorData.message || "Failed to update profile.";
      console.error(`Error ${response.status}: ${errorMessage}`);
      throw new Error(errorMessage);
    }

    const data = await response.json();

    if (!data || !data.data) {
      throw new Error("Invalid response data: Missing 'data' field.");
    }

    const adminUser = data.data;
    localStorage.setItem("adminUser", JSON.stringify(adminUser));

    return data;
  } catch (error) {
    console.error("Error updating profile:", error.message || error);
    alert("There was an error updating your profile. Please try again.");
    return null;
  }
}
