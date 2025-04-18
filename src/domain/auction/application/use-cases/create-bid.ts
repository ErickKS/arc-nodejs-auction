import { Either, left, right } from '@/core/logic/either'
import { Bid } from '../../enterprise/entities/bid'
import { AuctionsRepository } from '../repositories/auctions-repository'
import { BidsRepository } from '../repositories/bids-repository'

type CreateBidUseCaseRequest = {
  auctionId: string
  bidderId: string
  amount: number
}

type CreateBidUseCaseResponse = Either<
  Error,
  {
    bidId: string
  }
>

export class CreateBidUseCase {
  constructor(
    private readonly bidRepository: BidsRepository,
    private readonly auctionRepository: AuctionsRepository
  ) {}

  async execute({ auctionId, bidderId, amount }: CreateBidUseCaseRequest): Promise<CreateBidUseCaseResponse> {
    const auction = await this.auctionRepository.findById(auctionId)

    if (!auction) {
      return left(new Error('Auction not found'))
    }

    const bid = Bid.create({
      auctionId,
      bidderId,
      amount,
    })

    await this.bidRepository.create(bid)

    return right({
      bidId: bid.id,
    })
  }
}
