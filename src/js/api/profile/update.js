// Importing constants from your constants file
import { API_KEY, API_AUCTION_PROFILE } from '../constants.js';

// API Handler Function
 export async function updateProfileAPI(name, avatarUrl, token) {
  const url = `${API_AUCTION_PROFILE}/${name}`; // Using the imported constant for API URL
  const requestBody = {
    
    
    avatar: {
      url: avatarUrl,
      alt: "User avatar"
    },
   
  };

  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, 
        "X-Noroff-API-Key": API_KEY,

        // Assuming you are using an API key for authentication
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    const adminUser = data.data;
    localStorage.setItem("adminUser", JSON.stringify(adminUser));
    return data; // Return the updated profile data

  } catch (error) {
    console.error('Error updating profile:', error);
    alert('There was an error updating your profile.');
    return null;
  }
}
