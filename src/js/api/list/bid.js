import { API_AUCTION, API_KEY } from "../constants";

export async function placeBidApi(id, amount, token) {
    if (!id || !amount || amount <= 0 || !token) {
      throw new Error("Invalid parameters for bid request.");
    }
    const url = `${API_AUCTION}/${id}/bids`;
    console.log('Placing bid at URL:', url);
    console.log('With payload:', JSON.stringify({ amount }));
  
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "X-Noroff-API-Key": API_KEY,
    };
  
    try {
      const response = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify({ amount }),
      });
  
      if (!response.ok) {
        const errorText = await response.text(); // Capture error response text
        console.error(`Failed to place bid. Status: ${response.status}, Error: ${errorText}`);
        throw new Error(`Failed to place bid. Status: ${response.status}, Error: ${errorText}`);
      }
  
      const data = await response.json();
      console.log("Bid placed successfully:", data);
      return { success: true, message: "Bid placed successfully!" };
    } catch (error) {
      console.error("Error placing bid:", error);
      return { success: false, message: error.message };
    }
  }
  