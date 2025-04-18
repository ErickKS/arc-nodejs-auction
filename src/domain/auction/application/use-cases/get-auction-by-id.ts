import { Either, left, right } from '@/core/logic/either'
import { Auction } from '../../enterprise/entities/auction'
import { AuctionsRepository } from '../repositories/auctions-repository'

type GetAuctionByIdUseCaseRequest = {
  auctionId: string
}

type GetAuctionByIdUseCaseResponse = Either<
  Error,
  {
    auction: Auction
  }
>

export class GetAuctionByIdUseCase {
  constructor(private readonly auctionRepository: AuctionsRepository) {}

  async execute({ auctionId }: GetAuctionByIdUseCaseRequest): Promise<GetAuctionByIdUseCaseResponse> {
    const auction = await this.auctionRepository.findById(auctionId)

    if (!auction) {
      return left(new Error('Auction not found'))
    }

    return right({
      auction,
    })
  }
}
