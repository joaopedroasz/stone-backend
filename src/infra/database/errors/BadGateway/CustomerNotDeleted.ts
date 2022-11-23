import { BadGatewayError } from './BadGateway'

export class CustomerNotDeletedError extends BadGatewayError {
  constructor () {
    super('Customer not deleted')
    this.name = 'CustomerNotDeletedError'
  }
}
