import { BadGatewayError } from './BadGateway'

export class ConnectionNotEstablishedError extends BadGatewayError {
  constructor () {
    super('Connection not established')
    this.name = 'ConnectionNotEstablishedError'
  }
}
