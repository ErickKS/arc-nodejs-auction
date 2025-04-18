import { BidsRepository } from '@/domain/auction/application/repositories/bids-repository'
import { Bid } from '@/domain/auction/enterprise/entities/bid'

export class InMemoryBidsRepository implements BidsRepository {
  public bids: Bid[] = []

  async findById(bidId: string): Promise<Bid | null> {
    const bid = this.bids.find(bid => bid.id === bidId)

    if (!bid) return null

    return bid
  }

  async findHighestBidByAuctionId(auctionId: string): Promise<Bid | null> {
    const bids = this.bids.filter(bid => bid.auctionId === auctionId)

    if (bids.length === 0) return null

    const highestBid = bids.reduce((prev, current) => (prev.amount > current.amount ? prev : current))

    return highestBid
  }

  async create(bid: Bid): Promise<void> {
    this.bids.push(bid)
  }
}
