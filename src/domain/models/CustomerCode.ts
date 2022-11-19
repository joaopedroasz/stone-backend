export type CustomerCodeProps = {
  value: string
}

export class CustomerCode {
  private readonly value: string

  constructor ({ value }: CustomerCodeProps) {
    this.value = value
  }

  public getCode (): string {
    return this.value
  }
}
