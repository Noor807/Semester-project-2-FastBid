import { API_AUCTION_PROFILE, API_KEY } from "../constants";


export async function fetchAuctionProfile(user, token) {
  try {
    // Define the URL with the auction ID
    const url = `${API_AUCTION_PROFILE}/${user}`;

    // Set up headers including the Authorization token and API key
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`, // Authorization header with Bearer token
      "X-Noroff-API-Key": API_KEY, // Optionally include the API key in headers
    };

    // Send the DELETE request to the API to delete the auction listing
    const response = await fetch(url, {
      method: 'GET',
      headers: headers,
    });

    // Check if the response is successful
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to delete auction listing.');
    }
const data = await response.json()
    // If successful, return the response data (usually confirmation message)
   
    const {credits} = data.data
    localStorage.setItem('credit' , credits)
    
    
  } catch (error) {
    console.error('Error deleting auction listing:', error);
    throw error; // Propagate the error
  }
}
