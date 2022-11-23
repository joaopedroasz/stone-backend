export class BadGatewayError extends Error {
  protected readonly code: number = 502

  constructor (message: string) {
    super(message)
    this.name = 'BadGatewayError'
  }
}
