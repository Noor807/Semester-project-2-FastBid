import { fetchMyBids } from "../../api/profile/bidList";
import { generateAuctionBids } from "../homeBuilder/profileBids";

export async function fetchAndDisplayMyBids() {
  const userdata = JSON.parse(localStorage.getItem("adminUser"));
  try {
    const data = await fetchMyBids(userdata.name);
    if (!data) {
      throw new Error("something went wrong fail to fetch");
    }

    generateAuctionBids(data.data);
  } catch (error) {
    console.error("error");
  }
}
