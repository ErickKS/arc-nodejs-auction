import crypto from 'node:crypto'
import { Optional } from '@/core/@types/optional'

export type BidProps = {
  auctionId: string
  bidderId: string
  amount: number
  createdAt: Date
}

export class Bid {
  private _id: string
  protected props: BidProps

  get id(): string {
    return this._id
  }

  private constructor(props: BidProps, id?: string) {
    this.props = props
    this._id = id ?? crypto.randomUUID()
  }

  public static create(props: Optional<BidProps, 'createdAt'>, id?: string): Bid {
    const bid = new Bid(
      {
        createdAt: props.createdAt ?? new Date(),
        ...props,
      },
      id
    )

    return bid
  }
}
