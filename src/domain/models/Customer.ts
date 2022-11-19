export type CustomerProps = {
  id?: string
  document: string
  name: string
}

export class Customer {
  private readonly id?: string
  private readonly document: string
  private readonly name: string

  constructor ({ id, document, name }: CustomerProps) {
    this.id = id
    this.document = document
    this.name = name
  }
}
