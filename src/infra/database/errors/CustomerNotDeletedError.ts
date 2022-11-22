export class CustomerNotDeletedError extends Error {
  constructor () {
    super('Customer not deleted')
    this.name = 'CustomerNotDeletedError'
  }
}
