import { BadGatewayError } from '@/application/errors'

export class ConnectionNotEstablishedError extends BadGatewayError {
  constructor () {
    super('Connection not established')
    this.name = 'ConnectionNotEstablishedError'
  }
}
