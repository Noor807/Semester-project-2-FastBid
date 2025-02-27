/**
 * Retrieves the highest bid value and the name of the highest bidder from a given auction data object.
 * If no bids are available, it returns 0 for the highest bid and null for the bidder name.
 * 
 * @param {Object} data - The auction data containing bids.
 * @param {Array} data.bids - An array of bids in the auction.
 * @returns {Object} An object containing the highest bid value and the name of the highest bidder.
 * @returns {number} highestBid - The amount of the highest bid.
 * @returns {string|null} highestBidName - The name of the highest bidder, or null if no bids are present.
 */
export function getHighestBidValue(data) {
  if (!data.bids || data.bids.length === 0) {
    return { highestBid: 0, highestBidName: null };
  }

  const highestBid = data.bids.reduce(
    (maxBid, bid) => {
      return bid.amount > maxBid.amount ? bid : maxBid;
    },
    { amount: 0, bidder: { name: null } }
  );

  return {
    highestBid: highestBid.amount,
    highestBidName: highestBid.bidder.name,
  };
}
