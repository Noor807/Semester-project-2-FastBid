import { API_AUCTION, API_KEY } from "../constants.mjs"; // Ensure the API URL is correctly imported

// Function to delete an auction listing by ID
export async function deleteAuction(id, authToken) {
  try {
    // Define the URL with the auction ID
    const url = `${API_AUCTION}/${id}`;

    // Set up headers including the Authorization token and API key
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`, // Authorization header with Bearer token
      "X-Noroff-API-Key": API_KEY, // Optionally include the API key in headers
    };

    // Send the DELETE request to the API to delete the auction listing
    const response = await fetch(url, {
      method: 'DELETE',
      headers: headers,
    });

    // Check if the response is successful
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to delete auction listing.');
    }

    // If successful, return the response data (usually confirmation message)
    
    return { success: true, message: "Post deleted successfully" };
  } catch (error) {
    console.error('Error deleting auction listing:', error);
    throw error; // Propagate the error
  }
}
