import { BadGatewayError } from './BadGateway'

export class CustomerNotCreatedError extends BadGatewayError {
  constructor () {
    super('Customer not created')
    this.name = 'CustomerNotCreatedError'
  }
}
