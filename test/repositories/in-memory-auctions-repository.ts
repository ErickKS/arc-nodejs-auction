import { type AuctionsRepository } from '@/domain/auction/application/repositories/auctions-repository'
import { type Auction } from '@/domain/auction/enterprise/entities/auction'

export class InMemoryAuctionsRepository implements AuctionsRepository {
  public auctions: Auction[] = []

  async create(auction: Auction): Promise<void> {
    this.auctions.push(auction)
  }
}
