import crypto from 'node:crypto'

export type AuctionProps = {
  title: string
  startAmount: number
  minIncrement: number
  startDate: Date
  endDate: Date
}

export class Auction {
  private _id: string
  protected props: AuctionProps

  get id(): string {
    return this._id
  }

  get minIncrement(): number {
    return this.props.minIncrement
  }

  private constructor(props: AuctionProps, id?: string) {
    this.props = props
    this._id = id ?? crypto.randomUUID()
  }

  public static create(props: AuctionProps, id?: string): Auction {
    const auction = new Auction(
      {
        ...props,
      },
      id
    )

    return auction
  }
}
