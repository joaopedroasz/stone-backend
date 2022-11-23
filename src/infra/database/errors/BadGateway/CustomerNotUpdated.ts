import { BadGatewayError } from '@/application/errors'

export class CustomerNotUpdatedError extends BadGatewayError {
  constructor () {
    super('Customer not updated')
    this.name = 'CustomerNotUpdatedError'
  }
}
