import { BadGatewayError } from './BadGateway'

export class CustomerNotUpdatedError extends BadGatewayError {
  constructor () {
    super('Customer not updated')
    this.name = 'CustomerNotUpdatedError'
  }
}
