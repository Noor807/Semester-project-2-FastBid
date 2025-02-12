export function getHighestBidValue(data) {
    if (!data.bids || data.bids.length === 0) {
      return 0;
    }
  
    return data.bids.reduce((max, bid) => {
      return bid.amount > max ? bid.amount : max;
    }, 0);
  }