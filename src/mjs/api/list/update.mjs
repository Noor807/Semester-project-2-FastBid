import { API_AUCTION } from "../constants.mjs";
const API_KEY = import.meta.env.VITE_API_KEY; // API key imported from .env file

// Async function to edit an auction listing
export async function editAuction(id, formData, authToken) {
  try {
    console.log('formData' , formData);
    
    // Set up the request headers, including the Authorization token (Bearer token)
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`, // Pass the auth token
      "X-Noroff-API-Key": API_KEY, // Optionally, if your API requires the API Key in the headers
    };

    // Send the PUT request to the API to update the auction listing
    const response = await fetch(`${API_AUCTION}/${id}`, {
      method: 'PUT',
      headers: headers,
      body: JSON.stringify(formData), // Include the form data in the request body
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to update auction listing.');
    }

    const data = await response.json();
    return data; // Return the data received from the API (updated listing data)
  } catch (error) {
    console.error('Error editing auction listing:', error);
    throw error; // Propagate the error
  }
}
