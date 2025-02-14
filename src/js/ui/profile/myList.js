import { fetchMyListings } from "../../api/profile/myList";
import { generateAuctionListing } from "../homeBuilder/profileListing";

export async function fetchAndDisplayMyList() {
const userdata =JSON.parse(localStorage.getItem('adminUser'))
   try {
    const data = await fetchMyListings(userdata.name)
    if (!data) {
    throw new Error("something went wrong fail to fetch");
        
    } 
    generateAuctionListing(data.data)   
   
   } catch (error) {
    console.error('error');
    
   } 
}