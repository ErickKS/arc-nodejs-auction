import { Bid } from '../../enterprise/entities/bid'

export abstract class BidsRepository {
  abstract findById(bidId: string): Promise<Bid | null>
  abstract findHighestBidByAuctionId(auctionId: string): Promise<Bid | null>
  abstract create(bid: Bid): Promise<void>
}
