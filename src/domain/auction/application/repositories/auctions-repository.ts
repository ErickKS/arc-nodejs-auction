import { Auction } from '../../enterprise/entities/auction'

export abstract class AuctionsRepository {
  abstract findById(auctionId: string): Promise<Auction | null>
  abstract create(auction: Auction): Promise<void>
}
