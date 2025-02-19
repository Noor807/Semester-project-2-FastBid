      import { API_AUCTION_PROFILE, API_KEY } from "../constants";
      
       export async function fetchMyBids(name) {
          const url = `${API_AUCTION_PROFILE}/${name}/bids?_listings=true`;
           const token = localStorage.getItem('token')
      
          const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Pass the auth token
            'X-Noroff-API-Key': API_KEY, // Optionally, if your API requires the API Key in the headers
          };
        
          try {
            const response = await fetch(url, { method: 'GET', headers });
            
            // Check if the response is successful (status code 200)
            if (!response.ok) {
              throw new Error(`Error fetching listings: ${response.statusText}`);
            }
        
            // Parse and return the JSON response data
            const data = await response.json();
            return data; // This will contain the listings data
          } catch (error) {
            console.error('Error:', error);
            throw error; // Optionally rethrow to handle elsewhere
          }
        }
      
