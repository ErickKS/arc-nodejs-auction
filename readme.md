# Auction System

## Functional Requirements (FR)
1. The auction opens and closes at specific times; bids outside of this time window are not accepted.
2. There is a minimum bid value; bids below this value are not accepted.
3. Every new bid must be higher than the current highest bid plus the minimum increment value.
4. The same user is not allowed to place two consecutive bids.
5. The auction can only be closed after the scheduled end time has passed.
6. There must be an API to create auctions and submit bids.
7. A WebSocket must be available to track bids in real-time.