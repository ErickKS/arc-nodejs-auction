import { Either, right } from '@/core/logic/either'
import { Auction } from '../../enterprise/entities/auction'
import { AuctionsRepository } from '../repositories/auctions-repository'

type CreateAuctionUseCaseRequest = {
  title: string
  startAmount: 100
  minIncrement: 10
  startDate: Date
  endDate: Date
}

type CreateAuctionUseCaseResponse = Either<
  Error,
  {
    auctionId: string
  }
>

export class CreateAuctionUseCase {
  constructor(private readonly auctionRepository: AuctionsRepository) {}

  async execute({
    title,
    startAmount,
    minIncrement,
    startDate,
    endDate,
  }: CreateAuctionUseCaseRequest): Promise<CreateAuctionUseCaseResponse> {
    const auction = Auction.create({
      title,
      startAmount,
      minIncrement,
      startDate,
      endDate,
    })

    await this.auctionRepository.create(auction)

    return right({
      auctionId: auction.id,
    })
  }
}
