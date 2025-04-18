import { BidsRepository } from '@/domain/auction/application/repositories/bids-repository'
import { Bid } from '@/domain/auction/enterprise/entities/bid'

export class InMemoryBidsRepository implements BidsRepository {
  public bids: Bid[] = []

  async findById(bidId: string): Promise<Bid | null> {
    const bid = this.bids.find(bid => bid.id === bidId)

    if (!bid) return null

    return bid
  }

  async create(bid: Bid): Promise<void> {
    this.bids.push(bid)
  }
}
