import { CustomerCode } from './CustomerCode'

export type CustomerProps = {
  id: string
  document: number
  name: string
}

export class Customer {
  private readonly id: CustomerCode
  private readonly document: number
  private readonly name: string

  constructor ({
    id,
    document,
    name
  }: CustomerProps) {
    this.id = new CustomerCode({ value: id })
    this.document = document
    this.name = name
  }

  public getId (): string {
    return this.id.getCode()
  }

  public getDocument (): number {
    return this.document
  }

  public getName (): string {
    return this.name
  }
}
