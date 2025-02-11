import { API_AUCTION, API_KEY } from "../constants";


// Async function to create a new list
export async function createList(formData, authToken) {
  try {
    // Set up the request headers, including the Authorization token (Bearer token)
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`, // Pass the auth token
      "X-Noroff-API-Key": API_KEY, // Optionally, if your API requires the API Key in the headers
    };
console.log('url' , API_AUCTION);

    // Send the POST request to the API to create a new auction listing
    const response = await fetch(API_AUCTION, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(formData), // Include the form data in the request body
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create list.');
    }

    const data = await response.json();
    return data; // Return the data received from the API (new listing data)
  } catch (error) {
    console.error('Error creating list:', error);
    throw error; // Propagate the error
  }
}
