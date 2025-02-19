
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
  
    return { highestBid: highestBid.amount, highestBidName: highestBid.bidder.name };
  }