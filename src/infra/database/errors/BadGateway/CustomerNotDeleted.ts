import { BadGatewayError } from '@/application/errors'

export class CustomerNotDeletedError extends BadGatewayError {
  constructor () {
    super('Customer not deleted')
    this.name = 'CustomerNotDeletedError'
  }
}
