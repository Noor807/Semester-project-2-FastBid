import { API_AUCTION, API_KEY } from "../constants.mjs";

export async function deleteAuction(id, authToken) {
  try {
    const url = `${API_AUCTION}/${id}`;

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
      "X-Noroff-API-Key": API_KEY,
    };

    const response = await fetch(url, {
      method: "DELETE",
      headers: headers,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to delete auction listing.");
    }

    return { success: true, message: "Post deleted successfully" };
  } catch (error) {
    console.error("Error deleting auction listing:", error);
    throw error;
  }
}
