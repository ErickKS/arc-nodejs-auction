import { InMemoryAuctionsRepository } from 'test/repositories/in-memory-auctions-repository'
import { InMemoryBidsRepository } from 'test/repositories/in-memory-bids-repository'
import { Auction } from '../../enterprise/entities/auction'
import { CreateBidUseCase } from './create-bid'

let inMemoryBidsRepository: InMemoryBidsRepository
let inMemoryAuctionsRepository: InMemoryAuctionsRepository
let sut: CreateBidUseCase

describe('Create Bid Use Case', () => {
  beforeEach(() => {
    inMemoryBidsRepository = new InMemoryBidsRepository()
    inMemoryAuctionsRepository = new InMemoryAuctionsRepository()
    sut = new CreateBidUseCase(inMemoryBidsRepository, inMemoryAuctionsRepository)
  })

  it('should create an bid', async () => {
    const newAuction = Auction.create({
      title: 'Test Auction',
      startAmount: 100,
      minIncrement: 10,
      startDate: new Date('2025-04-18T10:00:00Z'),
      endDate: new Date('2025-04-18T12:00:00Z'),
    })
    inMemoryAuctionsRepository.create(newAuction)

    const result = await sut.execute({
      auctionId: newAuction.id,
      bidderId: 'bidder-id',
      amount: 110,
    })

    expect(result.isRight()).toBeTruthy()
    expect(result.value).toEqual({
      bidId: inMemoryBidsRepository.bids[0].id,
    })
  })

  it('should not be able the bidder to make sequential bids', async () => {
    const newAuction = Auction.create({
      title: 'Test Auction',
      startAmount: 100,
      minIncrement: 10,
      startDate: new Date('2025-04-18T10:00:00Z'),
      endDate: new Date('2025-04-18T12:00:00Z'),
    })
    inMemoryAuctionsRepository.create(newAuction)

    await sut.execute({
      auctionId: newAuction.id,
      bidderId: 'bidder-id',
      amount: 110,
    })

    const result = await sut.execute({
      auctionId: newAuction.id,
      bidderId: 'bidder-id',
      amount: 105,
    })

    expect(result.isLeft()).toBeTruthy()
  })
})
