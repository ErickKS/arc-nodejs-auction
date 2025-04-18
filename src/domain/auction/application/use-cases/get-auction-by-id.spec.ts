import { InMemoryAuctionsRepository } from 'test/repositories/in-memory-auctions-repository'
import { Auction } from '../../enterprise/entities/auction'
import { GetAuctionByIdUseCase } from './get-auction-by-id'

let inMemoryAuctionsRepository: InMemoryAuctionsRepository
let sut: GetAuctionByIdUseCase

describe('Get Auction By Id Use Case', () => {
  beforeEach(() => {
    inMemoryAuctionsRepository = new InMemoryAuctionsRepository()
    sut = new GetAuctionByIdUseCase(inMemoryAuctionsRepository)
  })

  it('should get an auction by id', async () => {
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
    })

    expect(result.isRight()).toBeTruthy()
    expect(result.value).toMatchObject({
      auction: expect.objectContaining({
        id: newAuction.id,
      }),
    })
  })
})
