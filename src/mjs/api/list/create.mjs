import { API_AUCTION, API_KEY } from "../constants.mjs";

export async function createList(formData, authToken) {
  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
      "X-Noroff-API-Key": API_KEY,
    };
    console.log("url", API_AUCTION);

    const response = await fetch(API_AUCTION, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create list.");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating list:", error);
    throw error;
  }
}
