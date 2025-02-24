import { API_AUCTION } from "../constants.mjs";
const API_KEY = import.meta.env.VITE_API_KEY;

export async function editAuction(id, formData, authToken) {
  try {
    console.log("formData", formData);

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
      "X-Noroff-API-Key": API_KEY,
    };

    const response = await fetch(`${API_AUCTION}/${id}`, {
      method: "PUT",
      headers: headers,
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to update auction listing.");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error editing auction listing:", error);
    throw error;
  }
}
