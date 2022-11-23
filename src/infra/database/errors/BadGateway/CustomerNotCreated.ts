import { BadGatewayError } from '@/application/errors'

export class CustomerNotCreatedError extends BadGatewayError {
  constructor () {
    super('Customer not created')
    this.name = 'CustomerNotCreatedError'
  }
}
