import { fetchWinAuction } from "../../api/profile/winList";
import { generateWinningAuctions } from "../homeBuilder/profileWinList";

export async function fetchAndDisplayMyWins() {
  const userdata = JSON.parse(localStorage.getItem("adminUser"));
  try {
    const data = await fetchWinAuction(userdata.name);
    if (!data) {
      throw new Error("something went wrong fail to fetch");
    }
    generateWinningAuctions(data.data);
  } catch (error) {
    console.error("error");
  }
}
