export class ConnectionNotEstablishedError extends Error {
  constructor () {
    super('Connection not established')
    this.name = 'ConnectionNotEstablishedError'
  }
}
