
import { API_AUCTION } from "../constants.mjs";
import { prepareAuthHeaders } from "../../utilities/authUtils.mjs"; 

export async function deleteAuction(id) {
  if (!id) {
    throw new Error("Invalid auction ID");
  }

  const url = `${API_AUCTION}/${id}`;
  const headers = prepareAuthHeaders(); 

  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage = errorData.message || "Failed to delete auction listing.";
      console.error(`Error ${response.status}: ${errorMessage}`);
      throw new Error(errorMessage); 
    }

    
    return { success: true, message: "Auction deleted successfully." };
  } catch (error) {
    console.error("Error deleting auction listing:", error);
    throw error; 
  }
}
