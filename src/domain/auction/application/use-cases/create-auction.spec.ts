import { InMemoryAuctionsRepository } from 'test/repositories/in-memory-auctions-repository'
import { CreateAuctionUseCase } from './create-auction'

let inMemoryAuctionsRepository: InMemoryAuctionsRepository
let sut: CreateAuctionUseCase

describe('Create Auction Use Case', () => {
  beforeEach(() => {
    inMemoryAuctionsRepository = new InMemoryAuctionsRepository()
    sut = new CreateAuctionUseCase(inMemoryAuctionsRepository)
  })

  it('should create an auction', async () => {
    const result = await sut.execute({
      title: 'Test Auction',
      startAmount: 100,
      minIncrement: 10,
      startDate: new Date('2025-04-18T10:00:00Z'),
      endDate: new Date('2025-04-18T12:00:00Z'),
    })

    expect(result.isRight()).toBeTruthy()
  })
})
