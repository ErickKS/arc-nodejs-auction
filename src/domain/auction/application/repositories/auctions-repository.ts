import { Auction } from '../../enterprise/entities/auction'

export abstract class AuctionsRepository {
  abstract create(auction: Auction): Promise<void>
}
